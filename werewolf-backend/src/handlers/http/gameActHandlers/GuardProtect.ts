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
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { nextStateOfGuardProtect } from "./ChangeStateHandler";
import { HunterCheckHandler } from "./HunterCheck";
import { SheriffElectHandler } from "./SheriffElect";

export const GuardProtectHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    player.characterStatus.protects =
      player.characterStatus.protects || [];

    const protects = player.characterStatus.protects;
    if (protects[protects.length - 1] === target) {
      // 如果两天保了同一个人
      createError({
        status: 401,
        msg: "不能连续两天守护相同的人",
      });
    } else {
      protects[room.currentDay] = target;
      const protectPlayer = room.getPlayerByIndex(target);
      if (protectPlayer.die?.at === room.currentDay) {
        // 如果确实是今天被杀了

        const witchStatus = room.players.find(
          (p) => p.character === "WITCH"
        )?.characterStatus;
        if (
          witchStatus?.MEDICINE?.usedAt === target &&
          witchStatus?.MEDICINE?.usedDay === room.currentDay
        ) {
          // 如果女巫恰好还救了, 就奶死了
          protectPlayer.die = {
            at: room.currentDay,
            fromCharacter: "GUARD",
            fromIndex: [player.index],
          };
        } else {
          // 如果女巫没救
          // 设置了此人未被狼人杀死
          protectPlayer.die = null;
        }
      } // 如果今天没被杀, 无事发生
    }
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState: function (room: Room): void {
    // 如果没有守卫就直接开启猎人的阶段
    if (!room.needingCharacters.includes("GUARD"))
      return GuardProtectHandler.endOfState(room);

    const timeout = TIMEOUT[GameStatus.GUARD_PROTECT];
    // TODO 改成 this ?
    // 设置此状态结束的回调
    room.timer = setTimeout(() => {
      GuardProtectHandler.endOfState(room);
    }, timeout);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.GUARD_PROTECT,
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

    return BeforeDayDiscussHandler.startOfState(room);
  },
};
