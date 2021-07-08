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
import { GameActHandler, Response, setTimerNSendMsg } from "./";
import { nextStateOfSheriffVote } from "./ChangeStateHandler";

export const SheriffVoteHandler: GameActHandler = {
  async handleHttp(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    if (!room.getPlayerByIndex(target)?.isElecting)
      createError({ status: 400, msg: "选择的玩家未参与竞选" });

    player.sheriffVotes[0] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  async endOfState(room: Room) {
    const votes = room.players.map((p) => p.sheriffVotes[0]);

    // 找到警长人选
    const voteRes = getVoteResult(votes);
    if (voteRes !== null) {
    }
    setTimerNSendMsg(room, (r) =>
      nextStateOfSheriffVote(r, voteRes)
    );
  },
};
