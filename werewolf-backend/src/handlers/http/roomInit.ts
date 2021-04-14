import { Middleware } from "koa";
import Room, { listAllOfRoom } from "../../models/RoomModel";

import {
  InitRoomRequest,
  InitRoomResponse,
} from "../../../../werewolf-frontend/shared/httpMsg/InitRoomMsg";
import { choosePublicInfo } from "src/models/PlayerModel";

const roomInit: Middleware = async (ctx) => {
  const roomNumber = ctx.get("RoomNumber");

  const room = await Room.findOne({ roomNumber });
  if (!room) ctx.error(404, "未找到此房间号");

  const players = await listAllOfRoom(room);

  const ret: InitRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      players: choosePublicInfo(players),
      needingCharacters: room.needingCharacters,
    },
  };

  ctx.body = ret;
};

export default roomInit;
