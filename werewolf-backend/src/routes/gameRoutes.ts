import * as Router from "koa-router";

import gameAct from "../handlers/http/gameAct";
import gameBegin from "../handlers/http/gameBegin";
import hintResultRouter from "../handlers/http/gameGetHint";
import gameStatus from "../handlers/http/gameStatus";

const gameRouter = new Router();

gameRouter.post("game begin", "/begin", gameBegin); // 进行角色的操作相关 api
gameRouter.post("game status", "/status", gameStatus); // 查看游戏状态相关 api
gameRouter.post("game act", "/act", gameAct); // 进行角色的操作相关 api
gameRouter.use(
  "/hint", // 获取提示信息并在前端显示弹窗的 api
  hintResultRouter.routes(),
  hintResultRouter.allowedMethods()
);
// TODO get vote result
// TODO 各个玩家在自己回合开始时检查自己能干嘛, 如女巫看看昨晚谁死了, 守卫看看自己昨晚保的谁

export default gameRouter;
