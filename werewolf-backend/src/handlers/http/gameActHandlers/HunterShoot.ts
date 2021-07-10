import { Context } from "koa";
import io from "src";
import { createError } from "src/middleware/handleError";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";
import { renderHintNPlayers } from "src/utils/renderHintNplayers";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { ShowMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ShowMsg";
import { GameActHandler, Response, startCurrentState } from "./";
import { HunterCheckHandler } from "./HunterCheck";
import { SheriffAssignHandler } from "./SheriffAssign";

export const HunterShootHandler: GameActHandler = {
  curStatus: GameStatus.HUNTER_SHOOT,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    if (player.die?.fromCharacter === "WITCH") {
      // 如果被女巫毒死了就不能开枪
      createError({
        msg: "你被女巫毒死, 无法开枪",
        status: 401,
      });
    }
    if (player.characterStatus.shootAt)
      createError({ msg: "你已经开过枪了", status: 401 });

    const targetPlayer = room.getPlayerByIndex(target);
    player.characterStatus.shootAt = {
      day: room.currentDay,
      player: target,
    };
    targetPlayer.isAlive = false;
    targetPlayer.isDying = true;
    targetPlayer.die = {
      at: room.currentDay,
      fromCharacter: "HUNTER",
      fromIndex: [player.index],
    };

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room, nextState) {
    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
    startCurrentState(this, room, nextState);
  },

  async endOfState(room, nextState) {
    const shotByHunter = room.players.find(
      (p) => p.die?.fromCharacter === "HUNTER"
    );
    if (!shotByHunter) {
      // 到点了未选择则不进行操作, 直接进入警长传警徽阶段, 或者无猎人
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: "死者不是猎人或选择不开枪",
      } as ShowMsg);
      SheriffAssignHandler.startOfState(room, nextState);
    } else {
      // 如果死人了, 通知死人了
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers("猎人开枪射杀了", [
          shotByHunter.index,
        ]),
      } as ShowMsg);
      HunterCheckHandler.startOfState(room, nextState);
    }

    // TODO 无猎人? 直接取消这两个阶段
  },
};
