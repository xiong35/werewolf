import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { DieCheckHandler, GameActHandler, Response, startCurrentState } from "./";
import { HunterShootHandler } from "./HunterShoot";

export const LeaveMsgHandler: DieCheckHandler = {
  curStatus: GameStatus.LEAVE_MSG,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 结束发言
    LeaveMsgHandler.endOfState(room, room.nextStateOfDieCheck);

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room, nextState) {
    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
    if (
      room.currentDay === 1 ||
      nextState === GameStatus.WOLF_KILL
    ) {
      // 如果是第一夜或者是放逐投票死的就有遗言
      // 进入留遗言环节
      room.nextStateOfDieCheck = nextState;
      startCurrentState(this, room);
    } else {
      // 否则无遗言, 结束当前阶段
      LeaveMsgHandler.endOfState(room, nextState);
    }
  },

  async endOfState(room, nextState) {
    room.nextStateOfDieCheck = null;
    HunterShootHandler.startOfState(room, nextState);
  },
};
