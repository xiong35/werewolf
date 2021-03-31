import * as Router from "koa-router";

import roomRouter from "./roomRoutes";
import gameRouter from "./gameRoutes";
import { test } from "../t";

import UseAuth from "../middleware/auth";

const router = new Router();

router
  .all("/test", test)
  .use("/room", roomRouter.routes(), roomRouter.allowedMethods())
  .use(
    "/game",
    UseAuth(),
    gameRouter.routes(),
    gameRouter.allowedMethods()
  );

export default router;
