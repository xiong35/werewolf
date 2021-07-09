import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { nextStateOfSheriffVoteCheck } from "./ChangeStateHandler";

export const SheriffVoteCheckHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState: function (room: Room): void {
    const timeout = TIMEOUT[GameStatus.SHERIFF_VOTE_CHECK];
    // 设置此状态结束的回调
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      SheriffVoteCheckHandler.endOfState(room);
    }, timeout);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.SHERIFF_VOTE_CHECK,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    BeforeDayDiscussHandler.startOfState(room);
  },
};
