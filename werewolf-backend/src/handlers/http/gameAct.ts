import { Middleware } from "koa";
import Player from "../../models/PlayerModel";
import Room from "../../models/RoomModel";

import CharacterAct from "../../../../werewolf-frontend/shared/httpMsg/CharacterAct";
import { status2Handler } from "./gameActHandlers";

const gameAct: Middleware = async (ctx) => {
  const req = ctx.request.body as CharacterAct;

  const roomNumber = ctx.get("RoomNumber");
  const _id = ctx.get("Token");
  const room = await Room.findOne({
    roomNumber,
    isFinished: false,
  });
  if (!room) ctx.error(404, "未找到此房间号!");
  const player = await Player.findOne({ _id });
  if (!player) ctx.error(404, "id 错误!");

  const gameStatus = room.gameStatus?.[room.gameStatus.length - 1];

  ctx.body = await status2Handler[gameStatus]?.(
    room,
    player,
    req.target,
    ctx
  );
};

export default gameAct;
