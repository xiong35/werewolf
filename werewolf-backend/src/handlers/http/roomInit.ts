import { Middleware } from "koa";
import Room, { listAllOfRoom } from "../../models/RoomModel";

import {
  InitRoomRequest,
  InitRoomResponse,
} from "../../../../werewolf-frontend/shared/httpMsg/InitRoomMsg";

const roomInit: Middleware = async (ctx) => {
  const req = ctx.request.body as InitRoomRequest;
  const { roomNumber } = req;

  const room = await Room.findOne({ roomNumber });

  const players = await listAllOfRoom(room);

  const ret: InitRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      players,
      needingCharacters: room.needingCharacters,
    },
  };

  ctx.body = ret;
};

export default roomInit;
