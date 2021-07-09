import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import {
  GameStatus,
  TIMEOUT,
} from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { nextStateOfHunterCheck } from "./ChangeStateHandler";
import { SheriffElectHandler } from "./SheriffElect";

export const HunterCheckHandler: GameActHandler = {
  curStatus: GameStatus.HUNTER_CHECK,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // TODO

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room): void {
    // 如果没有猎人就直接结束此阶段
    if (!room.needingCharacters.includes("HUNTER"))
      return HunterCheckHandler.endOfState(room);

    const timeout = TIMEOUT[GameStatus.WITCH_ACT];
    // 设置此状态结束的回调
    room.timer = setTimeout(() => {
      HunterCheckHandler.endOfState(room);
    }, timeout * 1000);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.WITCH_ACT,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    // 下一个状态就进入到白天了
    // 此时应该让天数加一
    room.currentDay++;

    if (room.currentDay === 1) {
      return SheriffElectHandler.startOfState(room);
    }

    // 当执行到这里的时候, 意味着下一个状态就是
    // BEFORE_DAY_DISCUSS, 正准备开启他的定时器
    // 此时应该进行夜晚的结算并通知所有人获得晚上的消息了

    // 将夜晚死的人的 isAlive 设为false
    room.players
      .filter((p) => {
        const isKilledLastNight =
          p.die?.at === room.currentDay - 1;
        return isKilledLastNight;
      })
      .forEach((p) => (p.isAlive = false));
    // 守卫保的人和女巫救的人会设置 die = null, 故不会被设置为死亡

    return BeforeDayDiscussHandler.startOfState(room);
  },
};
