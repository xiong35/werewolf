import * as Router from "koa-router";

import UseAuth from "../middleware/auth";
import { test } from "../t";
import gameRouter from "./gameRoutes";
import roomRouter from "./roomRoutes";

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
