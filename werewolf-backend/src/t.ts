import { Middleware } from "koa";

import Room, { listAllOfNumber } from "./models/RoomModel";

export const test: Middleware = async (ctx) => {
  console.log("test");

  const res = await listAllOfNumber("723095");
  console.log(res);

  ctx.body = "pong";
};
