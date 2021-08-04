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

  // console.log("# roomJoin", { roomNumber });

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

  ctx.body = ret;
};

export default roomJoin;
