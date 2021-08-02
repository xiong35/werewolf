import { Middleware } from "koa";
import { createError } from "src/middleware/handleError";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";
import { renderHintNPlayers } from "src/utils/renderHintNPlayers";

import {
    IDHeaderName, RoomNumberHeaderName
} from "../../../../../werewolf-frontend/shared/constants";
import { HttpRes } from "../../../../../werewolf-frontend/shared/httpMsg/_httpResTemplate";

export const getWolfs: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);
  const playerID = ctx.get(IDHeaderName);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(playerID);

  if (player.character !== "WEREWOLF")
    createError({ status: 401, msg: "你的身份无法查看此消息" });

  const wolfs = room.players
    .filter(
      (p) => p.character === "WEREWOLF" && p._id !== playerID
    )
    .map((p) => p.index);

  const ret = {
    status: 200,
    msg: "ok",
    data: "",
  };

  if (wolfs.length) {
    ret.data = renderHintNPlayers("狼队友是:", wolfs);
  } else {
    ret.data = "你没有狼队友";
  }

  ctx.body = ret;
};
