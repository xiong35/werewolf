import { Middleware } from "koa";

import { Room } from "./models/RoomModel";

export const test: Middleware = async (ctx) => {
  // console.log("test");

  ctx.body = "pong";
};
