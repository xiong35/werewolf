import * as Router from "koa-router";

import { getWolfKillResult } from "./wolfKill";

const voteResultRouter = new Router();

voteResultRouter.get(
  "game hint wolfKill",
  "/wolfKill",
  getWolfKillResult
);

export default voteResultRouter;
