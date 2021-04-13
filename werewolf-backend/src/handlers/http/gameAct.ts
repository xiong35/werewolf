import { Middleware } from "koa";
import Player from "../../models/PlayerModel";

import CharacterAct from "../../../../werewolf-frontend/shared/httpMsg/CharacterAct";

const gameAct: Middleware = async (ctx) => {
  const req = ctx.request.body as CharacterAct;

  const ret = {
    status: 200,
    msg: "ok",
    data: {},
  };

  ctx.body = ret;
};

export default gameAct;
