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
import { nextStateOfSheriffSpeech } from "./ChangeStateHandler";

export const SheriffSpeachHandler: GameActHandler = {
  async handleHttp(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 结束自己的发言
    room.finishCurStatus.add(player.index);

    // 如果所有人都发言完毕, 进入警长投票环节
    if (
      room.finishCurStatus.size ===
      room.players.filter((p) => p.isElecting)?.length
    ) {
      clearTimeout(room.timer);
      setTimerNSendMsg(room, nextStateOfSheriffSpeech);
    }

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  async endOfState(room: Room) {
    setTimerNSendMsg(room, nextStateOfSheriffSpeech);
  },
};

// TODO 在24h后删除房间
