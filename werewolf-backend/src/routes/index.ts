import * as Router from "koa-router";

import roomRouter from "./roomRoutes";
import gameRouter from "./gameRoutes";

const router = new Router();

router
  .use("/room", roomRouter.routes(), roomRouter.allowedMethods())
  .use("/game", gameRouter.routes(), gameRouter.allowedMethods());

export default router;
