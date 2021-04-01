import { Middleware } from "koa";
import Room from "../../models/RoomModel";
import Player from "../../models/PlayerModel";

import { CharacterStatusResponse } from "../../../../werewolf-frontend/shared/httpMsg/CharacterStatusMsg";

const characterStatus: Middleware = async (ctx, next) => {
  // const ret: CharacterStatusResponse = {
  //   status: 200,
  //   msg: "ok",
  //   data: {},
  // };
  // ctx.body = ret;
};

export default characterStatus;
