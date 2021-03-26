import * as Router from "koa-router";

const gameRouter = new Router();

gameRouter.post("game ExileVote", "/ExileVote", (ctx, next) => {
  ctx.body = ctx.URL;
});

export default gameRouter;
