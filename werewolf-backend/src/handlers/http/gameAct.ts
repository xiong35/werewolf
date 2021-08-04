import { Middleware } from "koa";

import { IDHeaderName, RoomNumberHeaderName } from "../../../../werewolf-frontend/shared/constants";
import CharacterAct from "../../../../werewolf-frontend/shared/httpMsg/CharacterAct";
import { createError } from "../../middleware/handleError";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";
import { status2Handler } from "./gameActHandlers";
import { validateIdentity } from "./gameActHandlers/validateIdentity";

/**
 * handle character action
 */
const gameAct: Middleware = async (ctx) => {
  const req = ctx.request.body as CharacterAct;

  const roomNumber = ctx.get(RoomNumberHeaderName);
  const playerID = ctx.get(IDHeaderName);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(playerID);

  const isValidate = validateIdentity(room, player);
  if (isValidate !== true) {
    createError({ status: 401, msg: isValidate });
  }

  const gameStatus = room.curStatus;
  // TODO check character
  // TODO validate request

  // console.log("# gameAct", { gameStatus });

  // strategy pattern
  ctx.body = await status2Handler[
    gameStatus
  ]?.handleHttpInTheState?.(room, player, req.target, ctx);
};

export default gameAct;
