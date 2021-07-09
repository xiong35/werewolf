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
import { nextStateOfWitchAct } from "./ChangeStateHandler";
import { GuardProtectHandler } from "./GuardProtect";

export const WitchActHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 正编号代表救人, 负编号代表杀人
    if (target < 0) {
      room.getPlayerByIndex(-target).die = {
        at: room.currentDay,
        fromCharacter: "WITCH",
        fromIndex: [player.index],
      };
      player.characterStatus.POISON = {
        usedAt: -target,
        usedDay: room.currentDay,
      };
    } else {
      const savedPlayer = room.getPlayerByIndex(target);
      savedPlayer.die = null;
      savedPlayer.isAlive = true;
      // TODO 白天通知女巫救人
      player.characterStatus.MEDICINE = {
        usedAt: target,
        usedDay: room.currentDay,
      };
    }

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState: function (room: Room): void {
    // 如果没有女巫就直接结束此阶段
    if (!room.needingCharacters.includes("WITCH"))
      return WitchActHandler.endOfState(room);
    const timeout = TIMEOUT[GameStatus.WITCH_ACT];
    // TODO 改成 this ?
    // 设置此状态结束的回调
    room.timer = setTimeout(() => {
      WitchActHandler.endOfState(room);
    }, timeout);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: GameStatus.WITCH_ACT,
      timeout,
    } as ChangeStatusMsg);
  },

  async endOfState(room: Room) {
    GuardProtectHandler.startOfState(room);
  },
};
