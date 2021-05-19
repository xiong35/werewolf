import { Middleware } from "koa";

import { Room } from "../models/RoomModel";

const UseAuth = function (): Middleware {
  return async (ctx, next) => {
    if (ctx.method !== "OPTIONS") {
      const token = ctx.get("Token");
      const roomNumber = ctx.get("RoomNumber");

      Room.getRoom(roomNumber)?.getPlayerById(token); // 调用的函数自带检查
    }
    await next();
  };
};

export default UseAuth;
