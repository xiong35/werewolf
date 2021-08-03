import { Context } from "koa";

import io from "../../..";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { ShowMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ShowMsg";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { getVoteResult } from "../../../utils/getVoteResult";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import {
    GameActHandler, gotoNextStateAfterHandleDie, Response, startCurrentState, status2Handler
} from "./";
import { LeaveMsgHandler } from "./LeaveMsg";
import { SheriffAssignCheckHandler } from "./SheriffAssignCheck";

export const SheriffAssignHandler: GameActHandler = {
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
    player.sheriffVotes[room.currentDay] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room) {
    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查

    if (
      !room.players.find((p) => p.isSheriff) ||
      !room.curDyingPlayer.isSheriff
    ) {
      // 死者不是警长或无警长, 直接结束
      return SheriffAssignHandler.endOfState(room, false);
    }
    startCurrentState(this, room);
  },

  async endOfState(room, showSheriff: boolean = true) {
    if (!showSheriff) {
      // 无警长就直接清算
      return gotoNextStateAfterHandleDie(room);
    } else {
      // TODO 通知发表遗言的时间

      // 去除现在死的玩家的警长身份
      room.curDyingPlayer.isSheriff = false;
      const nextSheriff = room.players.find((p) => p.isSheriff);
      if (!nextSheriff) {
        io.to(room.roomNumber).emit(Events.SHOW_MSG, {
          innerHTML: "上任警长选择不传警徽, 现在没有警长了",
        } as ShowMsg);
      } else {
        io.to(room.roomNumber).emit(Events.SHOW_MSG, {
          innerHTML: renderHintNPlayers("下一任警长为", [
            nextSheriff.index,
          ]),
        } as ShowMsg);
      }

      SheriffAssignCheckHandler.startOfState(room);
    }
  },
};
