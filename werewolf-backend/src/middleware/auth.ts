import { Middleware } from "koa";

import { IDHeaderName, RoomNumberHeaderName } from "../../../werewolf-frontend/shared/constants";
import { Room } from "../models/RoomModel";

const UseAuth = function (): Middleware {
  return async (ctx, next) => {
    if (ctx.method !== "OPTIONS") {
      const playerID = ctx.get(IDHeaderName);
      const roomNumber = ctx.get(RoomNumberHeaderName);

      Room.getRoom(roomNumber)?.getPlayerById(playerID); // 调用的函数自带检查
    }
    await next();
  };
};

export default UseAuth;
