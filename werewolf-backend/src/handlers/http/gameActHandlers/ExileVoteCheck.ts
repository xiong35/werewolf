import { Context } from "koa";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { GameActHandler, Response, startCurrentState, status2Handler } from "./";

export const ExileVoteCheckHandler: GameActHandler = {
  curStatus: GameStatus.EXILE_VOTE_CHECK,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },
  /**
   * @param nextState 在确认完结果后进入哪个状态
   */
  startOfState: function (room: Room, nextState: GameStatus) {
    startCurrentState(this, room, nextState);
  },
  /**
   * @param nextState 在确认完结果后进入哪个状态
   */
  async endOfState(room: Room, nextState: GameStatus) {
    status2Handler[nextState].startOfState(room);
  },
};
