import * as Router from "koa-router";
import characterStatus from "../handlers/http/playCharacterStatus";

const gameRouter = new Router();

gameRouter.post(
  "game characterStatus",
  "/characterStatus",
  characterStatus
);

export default gameRouter;
