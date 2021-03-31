import { Middleware } from "koa";

import Room from "../models/RoomModel";

const UseAuth = function (): Middleware {
  return async (ctx, next) => {
    if (ctx.method !== "OPTIONS") {
      const token = ctx.get("Token");
      const roomNumber = ctx.get("RoomNumber");

      let room;
      try {
        room = await Room.findOne({
          roomNumber,
          playerIDs: token,
        });
      } catch (e) {
      } finally {
        if (!room) ctx.error(401, "ID错误!");
      }
    }
    await next();
  };
};

export default UseAuth;
