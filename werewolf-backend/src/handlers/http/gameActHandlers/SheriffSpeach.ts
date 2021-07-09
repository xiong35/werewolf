import { Context } from "koa";
import io from "src";
import { createError } from "src/middleware/handleError";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";
import { nextStateOfSheriffSpeech } from "./ChangeStateHandler";
import { SheriffVoteHandler } from "./SheriffVote";

export const SheriffSpeachHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 结束自己的发言
    room.finishCurStatus.add(player.index);

    // 如果所有人都发言完毕, 进入警长投票环节
    if (
      room.finishCurStatus.size ===
      room.players.filter((p) => p.isElecting)?.length
    ) {
      SheriffVoteHandler.startOfState(room);
    }

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState: function (room: Room): void {
    const timeout = TIMEOUT[GameStatus.SHERIFF_SPEECH];
    // 设置此状态结束的回调
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      SheriffSpeachHandler.endOfState(room);
    }, timeout);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.SHERIFF_SPEECH,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    SheriffVoteHandler.startOfState(room);
  },
};

// TODO 在24h后删除房间
