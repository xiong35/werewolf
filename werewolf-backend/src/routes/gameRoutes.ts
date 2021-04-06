import * as Router from "koa-router";
import gameStatus from "../handlers/http/gameStatus";

const gameRouter = new Router();

gameRouter.post("game gameStatus", "/gameStatus", gameStatus);

export default gameRouter;
