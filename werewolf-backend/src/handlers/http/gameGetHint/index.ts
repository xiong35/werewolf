import * as Router from "koa-router";

import { witchGetDie } from "./witchGetDie";
import { getWolfKillResult } from "./wolfKill";

const hintRouter = new Router();

hintRouter.get(
  "game hint wolfKill",
  "/wolfKill",
  getWolfKillResult
);

hintRouter.get(
  "game hint witchGetDie",
  "/witchGetDie",
  witchGetDie
);

export default hintRouter;
