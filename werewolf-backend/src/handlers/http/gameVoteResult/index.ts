import * as Router from "koa-router";

import { getWolfKillResult } from "./wolfKill";

const voteResultRouter = new Router();

voteResultRouter.get(
  "game vote wolfKill",
  "/wolfKill",
  getWolfKillResult
);

export default voteResultRouter;
