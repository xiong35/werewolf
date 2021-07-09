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
import { ShowMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ShowMsg";
import { GameActHandler, Response } from "./";
import { DayDiscussHandler } from "./DayDiscuss";
import { LeaveMsgHandler } from "./LeaveMsg";

export const BeforeDayDiscussHandler: GameActHandler = {
  curStatus: GameStatus.BEFORE_DAY_DISCUSS,
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // TODO 真正设置 isAlive 字段
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    if (room.curStatus !== this.curStatus) {
      room.gameStatus.push(this.curStatus);
    }
    // 当执行到这里的时候, 意味着刚刚进入白天
    // 此时应该进行夜晚的结算并通知所有人获得晚上的消息了
    // 在 guard 结束时天数就已经 +1 了

    // 将夜晚死的人的 isAlive 设为false
    const dyingPlayers = room.players.filter((p) => {
      const isKilledLastNight = p.die?.at === room.currentDay - 1;
      return isKilledLastNight;
    });
    dyingPlayers.forEach((p) => (p.isAlive = false));
    // 守卫保的人和女巫救的人会设置 die = null, 故不会被设置为死亡

    // 准备工作
    const timeout = TIMEOUT[GameStatus.BEFORE_DAY_DISCUSS];
    let stateTimeout = timeout;
    clearTimeout(room.timer);

    // 第一波常规消息
    if (dyingPlayers.length === 0) {
      // 平安夜
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: "昨晚是个平安夜",
        showTime: timeout - 1,
      } as ShowMsg);
    } else {
      // 死人了
      if (room.currentDay === 1) {
        // 第一晚有遗言
        io.to(room.roomNumber).emit(Events.SHOW_MSG, {
          innerHTML: renderHintNPlayers(
            "以下为昨晚死亡的玩家, 请发表遗言",
            dyingPlayers.map((p) => p.index)
          ),
          showTime: timeout - 1,
        } as ShowMsg);
        room.players.forEach((p) => (p.isDying = false)); //先把所有人置空
        dyingPlayers.forEach((p) => (p.isDying = true)); // 设置昨晚死的人正在留遗言
      } else {
        // 以后晚上死亡无遗言
        io.to(room.roomNumber).emit(Events.SHOW_MSG, {
          innerHTML: renderHintNPlayers(
            "以下为昨晚死亡的玩家, 不能发表遗言",
            dyingPlayers.map((p) => p.index)
          ),
          showTime: timeout - 1,
        } as ShowMsg);
      }
    }

    // 可能有第二波消息(女巫还救了人)
    const witch = room.players.find(
      (p) => p.character === "WITCH"
    );
    const { usedDay, usedAt } =
      witch.characterStatus?.MEDICINE ?? {};
    const savedPlayer = room.players.find(
      (p) => p.index === usedAt
    );
    if (usedDay === room.currentDay - 1 && savedPlayer?.isAlive) {
      // 如果女巫昨晚了救了人且救活了
      setTimeout(() => {
        // 过一份 timeout 时间后再通知
        io.to(room.roomNumber).emit(Events.SHOW_MSG, {
          innerHTML: renderHintNPlayers("女巫昨晚救活了:", [
            usedAt,
          ]),
          showTime: timeout - 1,
        } as ShowMsg);
      }, timeout * 1000);
      stateTimeout += timeout; // 多出一份时间发送另一个通知
    }

    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.SEER_CHECK,
      timeout: stateTimeout,
    } as ChangeStatusMsg);
    room.timer = setTimeout(() => {
      BeforeDayDiscussHandler.endOfState(
        room,
        dyingPlayers.length === 0
      );
    }, stateTimeout * 1000);
  },

  async endOfState(room: Room, hasDyingPlayers: boolean) {
    if (hasDyingPlayers) {
      // 如果死人了, 依次进行 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
      // 死亡操作都结束后进入白天发言环节
      LeaveMsgHandler.startOfState(room, GameStatus.DAY_DISCUSS);
    } else {
      // 如果没死人就进入白天讨论阶段
      DayDiscussHandler.startOfState(room);
    }
  },
};
