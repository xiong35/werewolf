import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response, status2Handler } from "./";
import { nextStateOfWolfKillCheck } from "./ChangeStateHandler";
import { SeerCheckHandler } from "./SeerCheck";

export const WolfKillCheckHandler: GameActHandler = {
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
    const timeout = TIMEOUT[GameStatus.WOLF_KILL_CHECK];
    // 设置此状态结束的回调
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      WolfKillCheckHandler.endOfState(room);
    }, timeout * 1000);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.WOLF_KILL_CHECK,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    SeerCheckHandler.startOfState(room);
  },
};
