import { Middleware } from "koa";
import Room, { listAllOfRoom } from "../../models/RoomModel";
import Player, { PlayerProps } from "../../models/PlayerModel";
import {
  CharacterEvent,
  GuardStatus,
  HunterStatus,
  SeerStatus,
  WerewolfStatus,
  WitchStatus,
} from "../../../../werewolf-frontend/shared/ModelDefs";
import { mergeEvents } from "src/utils/mergeEvents";

import { GameStatusResponse } from "../../../../werewolf-frontend/shared/httpMsg/GameStatusMsg";

const gameStatus: Middleware = async (ctx, next) => {
  const token = ctx.get("Token");
  const roomNumber = ctx.get("RoomNumber");

  const [curPlayer, room] = await Promise.all([
    Player.findOne({ _id: token }),
    Room.findOne({ roomNumber }),
  ]);
  if (!curPlayer) ctx.error(401, "id 错误");
  if (!room) ctx.error(404, "未找到此房间号");

  const players = await listAllOfRoom(room);

  // get events
  const events: CharacterEvent[] = [];
  if (room.isFinished) {
    const players = ((await room.execPopulate())
      .playerIDs as unknown) as PlayerProps[];
    players.forEach((player) => events.push(getEvents(player)));
  } else {
    events.push(getEvents(curPlayer));
  }

  const ret: GameStatusResponse = {
    status: 200,
    msg: "ok",
    data: {
      curCharacter: curPlayer.character,
      curStatus: curPlayer.characterStatus,
      self: curPlayer,
      curDay: room.currentDay,
      gameStatus: room.gameStatus?.[room.gameStatus.length - 1],
      players,
      events: mergeEvents(events),
    },
  };
  ctx.body = ret;
};

function getEvents(player: PlayerProps): CharacterEvent {
  const { character, characterStatus } = player;
  const ret: CharacterEvent = {
    character,
    events: [],
  };
  switch (character) {
    case "GUARD":
      (characterStatus as GuardStatus).protects.forEach(
        (index, at) =>
          ret.events.push({
            at,
            deed:
              index === undefined
                ? "空守"
                : `保护了 ${index} 号玩家`,
          })
      );
      break;
    case "HUNTER":
      const {
        player,
        day,
      } = (characterStatus as HunterStatus).shootAt;
      ret.events.push({
        at: day,
        deed:
          player === undefined
            ? "没有开枪"
            : `射死了 ${player} 号玩家`,
      });
      break;
    case "SEER":
      (characterStatus as SeerStatus).checks.forEach((check, at) =>
        ret.events.push({
          at,
          deed:
            check === undefined
              ? "没有查人"
              : `查验了 ${check.index} 号玩家，他是${
                  check.isWerewolf ? "狼人" : "良民"
                }`,
        })
      );
      break;
    case "WEREWOLF":
      (characterStatus as WerewolfStatus).wantToKills.forEach(
        (kill, at) =>
          ret.events.push({
            at,
            deed:
              kill === undefined
                ? "放弃选择"
                : `投票想杀 ${kill} 号玩家`,
          })
      );
      break;
    case "WITCH":
      const { MEDICINE, POISON } = characterStatus as WitchStatus;
      if (POISON.useDay !== -1)
        ret.events.push({
          at: POISON.useDay,
          deed: `用毒药杀害了 ${POISON.useAt} 号玩家`,
        });
      if (MEDICINE.useDay !== -1)
        ret.events.push({
          at: MEDICINE.useDay,
          deed: `用灵药复活了 ${MEDICINE.useAt} 号玩家`,
        });
      break;
  }

  return ret;
}

export default gameStatus;
