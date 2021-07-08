import { Middleware } from "koa";
import { createError } from "src/middleware/handleError";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import {
    IDHeaderName, RoomNumberHeaderName
} from "../../../../../werewolf-frontend/shared/constants";
import { VoteResultMsg } from "../../../../../werewolf-frontend/shared/httpMsg/VoteResult";

export const getWolfKillResult: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);
  const playerID = ctx.get(IDHeaderName);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(playerID);

  if (player.character !== "WEREWOLF")
    createError({ status: 401, msg: "你的身份无法查看此消息" });

  const finalTarget = room.players.find((player) => {
    if (!player.die) return false;
    const { at, fromCharacter } = player.die;
    return at === room.currentDay && fromCharacter === "WEREWOLF"; // 今天被狼杀死的目标即为投票结果
  });

  let data;
  if (!finalTarget) {
    data = {
      hintText: "今晚是个平安夜",
      result: null,
    };
  } else {
    data = {
      hintText: "今晚被杀的是",
      result: [finalTarget.index],
    };
  }

  const ret: VoteResultMsg = {
    status: 200,
    msg: "ok",
    data,
  };
  ctx.body = ret;
};
