import { Middleware } from "koa";

import { GameStatus, TIMEOUT } from "../../../../werewolf-frontend/shared/GameDefs";
import {
    JoinRoomRequest, JoinRoomResponse
} from "../../../../werewolf-frontend/shared/httpMsg/JoinRoomMsg";
import { Events } from "../../../../werewolf-frontend/shared/WSEvents";
import { RoomJoinMsg } from "../../../../werewolf-frontend/shared/WSMsg/RoomJoin";
import io from "../../index";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";
import { status2Handler } from "./gameActHandlers";

const roomJoin: Middleware = async (ctx) => {
  const req = ctx.request.body as JoinRoomRequest;
  const { name, password, roomNumber } = req;

  console.log("# roomJoin", { roomNumber });

  const room = Room.getRoom(roomNumber);

  const player = room.playerJoin(name, password);

  const ret: JoinRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      ID: player._id,
      index: player.index,
      needingCharacters: room.needingCharacters,
    },
  };

  const roomJoinMsg: RoomJoinMsg = room.choosePublicInfo();

  io.to(roomNumber).emit(Events.ROOM_JOIN, roomJoinMsg);

  if (roomJoinMsg.length === room.needingCharacters.length) {
    // 如果人数满了
    console.log("#game being");
    // assign characters
    const needingCharacters = [...room.needingCharacters];

    for (let p of room.players) {
      const index = Math.floor(
        Math.random() * needingCharacters.length
      );
      const character = needingCharacters.splice(index, 1)[0];

      p.character = character;
      switch (character) {
        case "GUARD":
          p.characterStatus = {
            protects: [],
          };
          break;
        case "HUNTER":
          p.characterStatus = {
            shootAt: {
              day: -1,
              player: -1,
            },
          };
          break;
        case "SEER":
          p.characterStatus = {
            checks: [],
          };
          break;
        case "WEREWOLF":
          p.characterStatus = {
            wantToKills: [],
          };
          break;
        case "WITCH":
          p.characterStatus = {
            POISON: { usedDay: -1, usedAt: -1 },
            MEDICINE: { usedDay: -1, usedAt: -1 },
          };
          break;
        case "VILLAGER":
          p.characterStatus = {};
        default:
          break;
      }
    }
    io.to(roomNumber).emit(Events.GAME_BEGIN);

    console.log("# roomJoin", "start");
    status2Handler[GameStatus.WOLF_KILL].startOfState(room);

    ret.data.open = true; // 设置前端进入游戏页
  }

  ctx.body = ret;
};

export default roomJoin;
