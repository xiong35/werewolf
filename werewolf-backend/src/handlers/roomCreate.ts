import { Middleware } from "koa";
import Room from "../models/RoomModel";
import Player from "../models/PlayerModel";

import {
  CreateRoomRequest,
  CreateRoomResponse,
} from "../../../shared/httpMsg/CreateRoomMsg";

const roomCreate: Middleware = async (ctx, next) => {
  const req = ctx.request.body as CreateRoomRequest;
  const { characters, name, password } = req;

  const creator = new Player({
    index: 1,
    name,
  });

  // TODO 检查创建房间的人数配比

  const room = new Room({
    roomNumber: Math.random().toString().slice(2, 8),
    creatorID: creator._id,
    playerIDs: [creator._id],
    needingCharacters: characters,
    remainingIndexes: new Array(characters.length - 1)
      .fill(0)
      .map((_, i) => i + 2),
    password,
  });

  await Promise.all([creator.save(), room.save()]);

  const ret: CreateRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      roomNumber: room.roomNumber,
      ID: creator._id,
    },
  };

  ctx.body = ret;
};

export default roomCreate;
