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

export const SheriffAssignHandler: DieCheckHandler = {
  curStatus: GameStatus.SHERIFF_ASSIGN,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    const targetPlayer = room.getPlayerByIndex(target);
    targetPlayer.isSheriff = true;
    player.isSheriff = false;

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

  async endOfState(room: Room, nextState) {},
};
