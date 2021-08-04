import { Middleware } from "koa";

import {
    CreateRoomRequest, CreateRoomResponse
} from "../../../../werewolf-frontend/shared/httpMsg/CreateRoomMsg";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";

const roomCreate: Middleware = async (ctx, next) => {
  const req = ctx.request.body as CreateRoomRequest;
  const { characters, name, password } = req;

  const creator = new Player({
    index: 1,
    name,
  });

  const room = new Room({
    creator: creator,
    needingCharacters: characters,
    password,
  });

  const ret: CreateRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      roomNumber: room.roomNumber,
      ID: creator._id,
    },
  };

  // console.log("# roomCreate", { room, creator });

  ctx.body = ret;
};

export default roomCreate;
