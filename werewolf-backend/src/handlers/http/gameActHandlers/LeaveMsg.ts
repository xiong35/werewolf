import { Context } from "koa";

import io from "../../..";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { getVoteResult } from "../../../utils/getVoteResult";
import { GameActHandler, Response, startCurrentState } from "./";
import { HunterShootHandler } from "./HunterShoot";

export const LeaveMsgHandler: GameActHandler = {
  curStatus: GameStatus.LEAVE_MSG,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 结束发言
    LeaveMsgHandler.endOfState(room);

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room) {
    // 此阶段必须有 room.nextStateOfDieCheck, 否则无法进行后续状态
    if (!room.nextStateOfDieCheck)
      throw new Error("未设置死亡结算后去到的状态");
    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
    if (
      room.currentDay === 1 ||
      room.nextStateOfDieCheck === GameStatus.WOLF_KILL
    ) {
      // 如果是第一夜或者是放逐投票死的就有遗言
      // 进入留遗言环节
      startCurrentState(this, room);
    } else {
      // 否则无遗言, 结束当前阶段
      LeaveMsgHandler.endOfState(room);
    }
  },

  async endOfState(room) {
    HunterShootHandler.startOfState(room);
  },
};
