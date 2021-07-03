import { Middleware } from "koa";
import { createError } from "src/middleware/handleError";

import { IDHeaderName, RoomNumberHeaderName } from "../../../../werewolf-frontend/shared/constants";
import CharacterAct from "../../../../werewolf-frontend/shared/httpMsg/CharacterAct";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";
import { status2Handler } from "./gameActHandlers";

/**
 * handle character action
 */
const gameAct: Middleware = async (ctx) => {
  const req = ctx.request.body as CharacterAct;

  const roomNumber = ctx.get(RoomNumberHeaderName);
  const playerID = ctx.get(IDHeaderName);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(playerID);

  const gameStatus = room.gameStatus?.[room.gameStatus.length - 1];
  // TODO check character

  // strategy pattern
  ctx.body = await status2Handler[gameStatus]?.(
    room,
    player,
    req.target,
    ctx
  );
};

export default gameAct;
