import { Middleware } from "koa";
import Room from "../models/RoomModel";
import Player from "../models/PlayerModel";

import {
  JoinRoomRequest,
  JoinRoomResponse,
} from "../../../shared/httpMsg/JoinRoomMsg";

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

  await Promise.all([player.save(), room.save()]);

  const ret: JoinRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      ID: player._id,
      index: player.index,
      needingCharacters: room.needingCharacters,
    },
  };

  ctx.body = ret;
};

export default roomJoin;
