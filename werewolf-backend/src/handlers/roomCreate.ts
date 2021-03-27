import { Middleware } from "koa";
import Room from "../models/RoomModel";
import Player from "../models/PlayerModel";

import {
  CreateRoomRequest,
  CreateRoomResponse,
} from "../../../shared/httpMsg/CreateRoomMsg";

const roomCreate: Middleware = async (ctx, next) => {
  const req = ctx.request.body as CreateRoomRequest;

  const playerNum = req.characters.length;
  const randInd = Math.floor(Math.random() * playerNum);
  const remainingCharacters = [...req.characters];
  const character = remainingCharacters.splice(randInd, 1)[0];

  const creator = new Player({
    index: 1,
    name: req.name,
    character,
  });
  console.log(creator);

  const room = new Room({
    roomNumber: Math.random().toString().slice(2, 8),
    creatorID: creator._id,
    playerIDs: [creator._id],
    needingCharacters: req.characters,
    remainingCharacters,
    remainingIndexes: new Array(playerNum - 1)
      .fill(0)
      .map((_, i) => i + 2),
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
