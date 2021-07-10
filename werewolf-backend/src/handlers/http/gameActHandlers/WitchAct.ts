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
import { GameActHandler, Response, startCurrentState } from "./";
import { nextStateOfWitchAct } from "./ChangeStateHandler";
import { GuardProtectHandler } from "./GuardProtect";

export const WitchActHandler: GameActHandler = {
  curStatus: GameStatus.WITCH_ACT,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    if (
      player.characterStatus?.MEDICINE?.usedDay ===
        player.characterStatus?.POISON?.usedDay &&
      player.characterStatus?.MEDICINE != null
    ) {
      createError({
        msg: "一天只能使用一瓶药",
        status: 401,
      });
    }

    // 正编号代表救人, 负编号代表杀人
    if (target < 0) {
      // 杀人
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
      // 救人
      // TODO 获得今天谁死了的接口i
      // TODO 女巫只能救今天死的人
      const savedPlayer = room.getPlayerByIndex(target);
      savedPlayer.die = null;
      savedPlayer.isAlive = true;
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

  startOfState(room: Room) {
    // 如果没有女巫就直接结束此阶段
    if (!room.needingCharacters.includes("WITCH"))
      return WitchActHandler.endOfState(room);

    startCurrentState(this, room);
  },

  async endOfState(room: Room) {
    GuardProtectHandler.startOfState(room);
  },
};
