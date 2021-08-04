import { Context } from "koa";

import io from "../../..";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { createError } from "../../../middleware/handleError";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { getVoteResult } from "../../../utils/getVoteResult";
import { GameActHandler, Response, startCurrentState } from "./";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { HunterCheckHandler } from "./HunterCheck";
import { SheriffElectHandler } from "./SheriffElect";

export const GuardProtectHandler: GameActHandler = {
  curStatus: GameStatus.GUARD_PROTECT,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    player.characterStatus.protects =
      player.characterStatus.protects || [];

    const protects = player.characterStatus.protects;
    if (protects[room.currentDay - 2] === target && target) {
      // 如果两天保了同一个人
      createError({
        status: 401,
        msg: "不能连续两天守护相同的人",
      });
    } else {
      protects[room.currentDay] = target;
      const protectPlayer = room.getPlayerByIndex(target);
      // console.log("# GuardProtect", { protectPlayer });
      if (
        protectPlayer.die?.at === room.currentDay &&
        protectPlayer.die?.fromCharacter === "WEREWOLF"
      ) {
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

  startOfState(room: Room) {
    // 如果没有守卫就直接开启猎人的阶段
    if (!room.needingCharacters.includes("GUARD"))
      return GuardProtectHandler.endOfState(room);

    startCurrentState(this, room);
  },

  async endOfState(room: Room) {
    if (room.currentDay === 0) {
      return SheriffElectHandler.startOfState(room);
    }

    return BeforeDayDiscussHandler.startOfState(room);
  },
};
