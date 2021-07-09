import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";
import { renderHintNPlayers } from "src/utils/renderHintNplayers";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { nextStateOfSheriffElect } from "./ChangeStateHandler";
import { SheriffSpeachHandler } from "./SheriffSpeach";

export const SheriffElectHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 加入参与竞选的人
    player.isElecting = true;

    return {
      status: 200,
      msg: "ok",
      data: {},
    };
  },

  startOfState: function (room: Room): void {
    const timeout = TIMEOUT[GameStatus.SHERIFF_ELECT];
    // 设置此状态结束的回调
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      SheriffElectHandler.endOfState(room);
    }, timeout);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.SHERIFF_ELECT,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    const electingPlayers = room.players.filter(
      (p) => p.isElecting
    );

    if (!electingPlayers || electingPlayers.length === 0) {
      // 无人竞选就直接到天亮
      return BeforeDayDiscussHandler.startOfState(room);
    } else if (electingPlayers.length === 1) {
      // 只有一人竞选就把警长给他
      electingPlayers[0].isSheriff = true;
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "仅有此玩家参选, 直接成为警长",
          [electingPlayers[0].index]
        ),
      });
      // TODO 连续让前端显示文字, 后一次会覆盖前一次, 需要前端修改弹窗逻辑
      return BeforeDayDiscussHandler.startOfState(room);
    } else {
      // 有多人参选
      // 设置参选警长的人都未结束发言
      room.finishCurStatus = new Set();
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "参选警长的玩家如下, 请依次进行发言",
          electingPlayers.map((p) => p.index)
        ),
      });
      return SheriffSpeachHandler.startOfState(room);
    }
  },
};
