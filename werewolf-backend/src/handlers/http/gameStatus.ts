import { Middleware } from "koa";
import { createError } from "src/middleware/handleError";
import { mergeEvents } from "src/utils/mergeEvents";

import { IDHeaderName, RoomNumberHeaderName } from "../../../../werewolf-frontend/shared/constants";
import { GameStatusResponse } from "../../../../werewolf-frontend/shared/httpMsg/GameStatusMsg";
import {
    CharacterEvent, GuardStatus, HunterStatus, PlayerDef, SeerStatus, WerewolfStatus, WitchStatus
} from "../../../../werewolf-frontend/shared/ModelDefs";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";

/**
 * fe refresh data
 */
const gameStatus: Middleware = async (ctx, next) => {
  const playerID = ctx.get(IDHeaderName);
  const roomNumber = ctx.get(RoomNumberHeaderName);

  const room = Room.getRoom(roomNumber);
  const players = room.players;
  const curPlayer = room.getPlayerById(playerID);
  // console.log("# gameStatus", { room, curPlayer });
  console.log("# gameStatus");
  // TODO 不是所有时候都能看到谁死了的

  // get events
  const events: CharacterEvent[] = [];
  if (room.isFinished) {
    players.forEach((player) => events.push(getEvents(player)));
  } else {
    events.push(getEvents(curPlayer));
  }

  const ret: GameStatusResponse = {
    status: 200,
    msg: "ok",
    data: {
      self: curPlayer,
      curDay: room.currentDay,
      gameStatus: room.curStatus,
      players: room.choosePublicInfo(),
      events: mergeEvents(events),
    },
  };
  ctx.body = ret;
};

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

export default gameStatus;
