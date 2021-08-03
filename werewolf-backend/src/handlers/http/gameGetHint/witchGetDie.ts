import { Middleware } from "koa";

import {
    IDHeaderName, RoomNumberHeaderName
} from "../../../../../werewolf-frontend/shared/constants";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { createError } from "../../../middleware/handleError";
import { Room } from "../../../models/RoomModel";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";

export const witchGetDie: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);
  const playerID = ctx.get(IDHeaderName);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(playerID);

  if (player.character !== "WITCH")
    createError({ status: 401, msg: "你的身份无法查看此消息" });
  if (player.characterStatus?.MEDICINE?.usedAt > 0)
    createError({
      status: 401,
      msg: "你已经用过解药, 无法查看死者",
    });

  const killedByWolfToday = room.players.find(
    (p) =>
      p.die?.fromCharacter === "WEREWOLF" &&
      p.die?.at === room.currentDay
  );

  const ret = {
    status: 200,
    msg: "ok",
    data: "",
  };
  if (!killedByWolfToday) {
    ret.data = "今晚无人被杀害";
  } else {
    ret.data = renderHintNPlayers("今晚被杀害的是:", [
      killedByWolfToday.index,
    ]);
  }
  ctx.body = ret;
};
