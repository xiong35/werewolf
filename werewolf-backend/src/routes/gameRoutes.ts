import * as Router from "koa-router";
import gameStatus from "../handlers/http/gameStatus";
import gameAct from "../handlers/http/gameAct";

const gameRouter = new Router();

gameRouter.post("/game/status", "/status", gameStatus);
gameRouter.post("/game/act", "/act", gameAct);

export default gameRouter;
