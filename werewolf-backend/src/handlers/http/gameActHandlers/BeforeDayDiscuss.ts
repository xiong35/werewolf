import { Context } from "koa";

import io from "../../../";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { ShowMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ShowMsg";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { GameActHandler, Response, startCurrentState } from "./";
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
    // 如果现在day还是偶数(在夜晚)就++(设置为白天)
    if (room.currentDay % 2 === 0) room.currentDay++;
    // 此时应该进行夜晚的结算并通知所有人获得晚上的消息了

    // 将夜晚死的人的 isAlive 设为false
    const dyingPlayers = room.players.filter((p) => {
      // 女巫救活了就没有 p.die?.fromCharacter 字段
      const isKilledLastNight =
        p.die?.at === room.currentDay - 1 && !p.die?.saved;
      return isKilledLastNight;
    });
    dyingPlayers.forEach((p) => (p.isAlive = false));
    // 守卫保的人和女巫救的人会设置 die = null, 故不会被设置为死亡

    clearTimeout(room.timer);

    if (dyingPlayers.length === 0) {
      // 平安夜
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: "昨晚是个平安夜",
        showTime: TIMEOUT[GameStatus.BEFORE_DAY_DISCUSS],
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
          showTime: TIMEOUT[GameStatus.BEFORE_DAY_DISCUSS],
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
          showTime: TIMEOUT[GameStatus.BEFORE_DAY_DISCUSS],
        } as ShowMsg);
      }
    }

    startCurrentState(this, room, dyingPlayers);
  },

  async endOfState(room: Room, dyingPlayers: Player[]) {
    if (dyingPlayers.length) {
      // 如果死人了, 依次进行 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
      // 死亡操作都结束后进入白天发言环节
      room.nextStateOfDieCheck = GameStatus.DAY_DISCUSS;
      room.curDyingPlayer = dyingPlayers[0];
      LeaveMsgHandler.startOfState(room);
    } else {
      // 如果没死人就进入白天讨论阶段
      room.players.forEach((p) => (p.canBeVoted = p.isAlive));
      room.toFinishPlayers = new Set(
        room.players
          .filter((p) => p.canBeVoted)
          .map((p) => p.index)
      );
      // console.log(
      //   "# BeforeDayDiscuss",
      //   "room.toFinishPlayers",
      //   room.toFinishPlayers
      // );
      DayDiscussHandler.startOfState(room);
    }
  },
};
