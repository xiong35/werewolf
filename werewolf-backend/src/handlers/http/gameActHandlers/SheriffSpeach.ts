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
import { SheriffVoteHandler } from "./SheriffVote";

export const SheriffSpeachHandler: GameActHandler = {
  curStatus: GameStatus.SHERIFF_SPEECH,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 结束自己的发言
    room.toFinishPlayers.delete(player.index);

    // 如果所有人都发言完毕, 进入警长投票环节
    if (room.toFinishPlayers.size === 0) {
      SheriffVoteHandler.startOfState(room);
    }

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    startCurrentState(this, room);
  },

  async endOfState(room: Room) {
    SheriffVoteHandler.startOfState(room);
  },
};

// TODO 在24h后删除房间
