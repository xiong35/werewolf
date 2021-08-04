import { Middleware } from "koa";

import { RoomNumberHeaderName } from "../../../../werewolf-frontend/shared/constants";
import {
    InitRoomRequest, InitRoomResponse
} from "../../../../werewolf-frontend/shared/httpMsg/InitRoomMsg";
import { Room } from "../../models/RoomModel";

/**
 * enter room to get new data
 */
const roomInit: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);

  const room = Room.getRoom(roomNumber);
  // console.log("# roomInit", { room, roomNumber });

  const ret: InitRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      players: room.choosePublicInfo(),
      needingCharacters: room.needingCharacters,
    },
  };

  ctx.body = ret;
};

export default roomInit;
