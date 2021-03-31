import { Middleware } from "koa";
import Room, { listAllOfRoom } from "../../models/RoomModel";
import Player from "../../models/PlayerModel";
import io from "../../index";
import { Events } from "../../../../werewolf-frontend/shared/WSEvents";
import { RoomJoinMsg } from "../../../../werewolf-frontend/shared/WSMsg/RoomJoin";

import {
  JoinRoomRequest,
  JoinRoomResponse,
} from "../../../../werewolf-frontend/shared/httpMsg/JoinRoomMsg";

const roomJoin: Middleware = async (ctx) => {
  const req = ctx.request.body as JoinRoomRequest;
  const { name, password, roomNumber } = req;

  const room = await Room.findOne({
    roomNumber,
  });

  if (!room) ctx.error(404, "未找到此房间号");
  if (room.password && room.password !== password)
    ctx.error(401, "密码错误");
  if (room.remainingIndexes.length === 0)
    ctx.error(401, "房间已满");

  const player = new Player({
    name,
    index: room.remainingIndexes.shift(),
  });

  room.playerIDs.push(player._id);

  const ret: JoinRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      ID: player._id,
      index: player.index,
      needingCharacters: room.needingCharacters,
    },
  };

  const roomJoinMsg: RoomJoinMsg = await listAllOfRoom(room);

  io.to(roomNumber).emit(Events.ROOM_JOIN, roomJoinMsg);

  if (roomJoinMsg.length === room.needingCharacters.length) {
    io.to(roomNumber).emit(Events.GAME_BEGIN);
    ret.data.open = true;
    const needingCharacters = [...room.needingCharacters];
    room.playerIDs.forEach(async (_id) => {
      const p = await Player.findOne({ _id });
      console.log(p);

      const index = Math.round(
        Math.random() * needingCharacters.length
      );
      const character = room.needingCharacters.splice(index, 1)[0];

      p.character = character;
      switch (character) {
        case "GUARD":
          p.characterStatus = {
            protects: [],
          };
          break;
        case "HUNTER":
          p.characterStatus = {
            canShoot: false,
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
            POISON: { useDay: -1, useAt: -1 },
            MEDICINE: { useDay: -1, useAt: -1 },
          };
          break;
        default:
          break;
      }
      p.save();
    });
  }
  await Promise.all([player.save(), room.save()]);

  ctx.body = ret;
};

export default roomJoin;
