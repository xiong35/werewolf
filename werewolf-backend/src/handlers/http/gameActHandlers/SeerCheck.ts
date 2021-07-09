import { Context } from "koa";
import io from "src";
import { createError } from "src/middleware/handleError";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { SeerCheckResponse } from "../../../../../werewolf-frontend/shared/httpMsg/SeerCheckMsg";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response, status2Handler } from "./";
import { nextStateOfSeerCheck } from "./ChangeStateHandler";
import { WitchActHandler } from "./WitchAct";

export const SeerCheckHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    const targetPlayer = room.getPlayerByIndex(target);

    if (!targetPlayer)
      createError({ status: 400, msg: "未找到此玩家" });

    const isWolf = targetPlayer.character === "WEREWOLF";

    player.characterStatus.checks =
      player.characterStatus.checks || [];
    player.characterStatus.checks[room.currentDay] = {
      index: target,
      isWerewolf: isWolf,
    };

    const ret: SeerCheckResponse = {
      data: {
        isWolf,
      },
      msg: "ok",
      status: 200,
    };
    return ret;
  },

  startOfState: function (room: Room): void {
    // 如果没有预言家就直接结束此阶段
    if (!room.needingCharacters.includes("SEER"))
      return SeerCheckHandler.endOfState(room);

    const timeout = TIMEOUT[GameStatus.SEER_CHECK];
    // 设置此状态结束的回调
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      SeerCheckHandler.endOfState(room);
    }, timeout);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.SEER_CHECK,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    WitchActHandler.startOfState(room);
  },
};
