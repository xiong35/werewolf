import * as Router from "koa-router";

import gameAct from "../handlers/http/gameAct";
import gameStatus from "../handlers/http/gameStatus";

const gameRouter = new Router();

gameRouter.post("/game/status", "/status", gameStatus);
gameRouter.post("/game/act", "/act", gameAct);
// TODO get vote result
// TODO 各个玩家在自己回合开始时检查自己能干嘛, 如女巫看看昨晚谁死了, 守卫看看自己昨晚保的谁

export default gameRouter;
