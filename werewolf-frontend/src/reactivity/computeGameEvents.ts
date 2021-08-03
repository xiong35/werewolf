import { computed } from "vue";

import {
    CharacterEvent, GameEvent, GuardStatus, HunterStatus, PlayerDef, SeerStatus, WerewolfStatus,
    WitchStatus
} from "../../shared/ModelDefs";
import { getVoteSituation, Vote } from "../utils/votes";
import { date, players, self } from "./game";

export const gameEvents = computed(() => {
  let _gameEvents: GameEvent[] = [];
  let _characterEvents: CharacterEvent[] = [];

  /** 警长竞选投票 */
  const sheriffVotes: Vote[] = [];
  /** 下标为天数, value 为 Vote[] */
  const exileVotes: Vote[][] = [];

  players.value.forEach((p) => {
    // 警长竞选投票
    if (date.value !== 0)
      sheriffVotes.push({
        from: p.index,
        voteAt: p.sheriffVotes[0],
      });

    // 传递警徽
    p.sheriffVotes.slice(1).forEach((vote, at) => {
      _gameEvents.push({
        at,
        character: "SHERIFF",
        deed: `${p.index} 号将警徽传给了 ${vote} 号`,
      });
    });

    // 放逐投票
    for (let at = 1; at < date.value; at += 2) {
      // 检查从第一天起每个白天的放逐投票
      const voteAt = p.hasVotedAt[at];
      exileVotes[at] = exileVotes[at] || [];
      exileVotes[at].push({
        from: p.index,
        voteAt,
      });
    }
  });

  // 处理警长竞选投票结果
  const sheriffVoteEvent: GameEvent = {
    at: 0,
    character: "SHERIFF",
    deed: "",
  };
  Object.entries(getVoteSituation(sheriffVotes)).map(
    ([target, voters]) => {
      const votersStr = voters.join("，");
      if (target === "0") {
        sheriffVoteEvent.deed += `${votersStr} 弃票\n`;
      } else {
        sheriffVoteEvent.deed += `${votersStr} 投给了 ${target}\n`;
      }
    }
  );
  if (sheriffVoteEvent.deed.length)
    _gameEvents.push(sheriffVoteEvent);

  // 处理白天投票结果
  const exileVoteEvents = exileVotes.map<GameEvent>(
    (votes, at) => {
      const exileVoteEvent: GameEvent = {
        at,
        character: "VILLAGER",
        deed: "",
      };
      Object.entries(getVoteSituation(votes)).map(
        ([target, voters]) => {
          const votersStr = voters.join("，");
          if (target === "0") {
            exileVoteEvent.deed += `${votersStr} 弃票\n`;
          } else {
            exileVoteEvent.deed += `${votersStr} 投给了 ${target}\n`;
          }
        }
      );

      return exileVoteEvent;
    }
  );
  _gameEvents = _gameEvents.concat(exileVoteEvents);

  // 1. 游戏中, 渲染自己的角色行动
  // 2. 游戏结束后可获得所有角色信息, 将他们都渲染出来
  const playerDetails = players.value as PlayerDef[];
  playerDetails.forEach((p) => {
    if (self.value.index === p.index) {
      _characterEvents.push(getEvents(self.value));
    } else if (p.characterStatus) {
      _characterEvents.push(getEvents(p));
    }
  });

  return mergeEvents(_gameEvents, _characterEvents);
});

function mergeEvents(
  gameEvents: GameEvent[],
  characterEvents: CharacterEvent[]
): GameEvent[] {
  return characterEvents
    .reduce<GameEvent[]>(
      (outPrev, cEvent) =>
        cEvent.events.reduce<GameEvent[]>(
          (innerPrev, eValue) => [
            ...innerPrev,
            {
              at: eValue.at,
              character: cEvent.character,
              deed: eValue.deed,
            },
          ],
          outPrev
        ),
      []
    )
    .concat(gameEvents)
    .sort((e1, e2) => e1.at - e2.at);
}

export const groupedGameEvents = computed(() => {
  const list: GameEvent[][] = [];
  gameEvents.value.forEach((e) => {
    const at = e.at;
    const day = Math.ceil(at / 2);
    list[day] ? void 0 : (list[day] = []);
    list[day].push(e);
  });
  return list;
});

/**
 * @param player 某个角色
 * @returns 这个角色对应的 event对象列表
 */
function getEvents(player: PlayerDef): CharacterEvent {
  const { character, characterStatus } = player;
  const ret: CharacterEvent = {
    character,
    events: [],
  };
  switch (character) {
    case "GUARD":
      (characterStatus as GuardStatus).protects.forEach(
        (index, at) => {
          if (at % 2 === 0)
            ret.events.push({
              at,
              deed:
                index === undefined || index === null
                  ? "空守"
                  : `保护了 ${index} 号玩家`,
            });
        }
      );
      break;
    case "HUNTER":
      const {
        player,
        day,
      } = (characterStatus as HunterStatus).shootAt;
      if (day !== -1)
        ret.events.push({
          at: day,
          deed:
            player === undefined || player === null
              ? "没有开枪"
              : `射死了 ${player} 号玩家`,
        });
      break;
    case "SEER":
      (characterStatus as SeerStatus).checks.forEach(
        (check, at) => {
          if (at % 2 === 0)
            ret.events.push({
              at,
              deed:
                check === undefined || check === null
                  ? "没有查人"
                  : `查验了 ${check.index} 号玩家，他是${
                      check.isWerewolf ? "狼人" : "良民"
                    }`,
            });
        }
      );
      break;
    case "WEREWOLF":
      (characterStatus as WerewolfStatus).wantToKills.forEach(
        (kill, at) => {
          if (at % 2 === 0)
            ret.events.push({
              at,
              deed:
                kill === undefined || kill === null
                  ? "放弃选择"
                  : `投票想杀 ${kill} 号玩家`,
            });
        }
      );
      break;
    case "WITCH":
      const { MEDICINE, POISON } = characterStatus as WitchStatus;

      if (POISON.usedDay !== -1)
        ret.events.push({
          at: POISON.usedDay,
          deed: `用毒药杀害了 ${POISON.usedAt} 号玩家`,
        });
      if (MEDICINE.usedDay !== -1)
        ret.events.push({
          at: MEDICINE.usedDay,
          deed: `用灵药复活了 ${MEDICINE.usedAt} 号玩家`,
        });
      break;
  }

  return ret;
}
