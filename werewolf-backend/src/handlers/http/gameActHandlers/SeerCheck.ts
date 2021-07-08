import { Context } from "koa";
import io from "src";
import { createError } from "src/middleware/handleError";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { SeerCheckResponse } from "../../../../../werewolf-frontend/shared/httpMsg/SeerCheckMsg";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response, setTimerNSendMsg, status2Handler } from "./";
import { nextStateOfSeerCheck } from "./ChangeStateHandler";

export const SeerCheckHandler: GameActHandler = {
  async handleHttp(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    const targetPlayer = room.players.find(
      (p) => p.index === target
    );

    if (!targetPlayer)
      createError({ status: 400, msg: "未找到此玩家" });

    const isWolf = targetPlayer.character === "WEREWOLF";

    const ret: SeerCheckResponse = {
      data: {
        isWolf,
      },
      msg: "ok",
      status: 200,
    };
    return ret;
  },

  async endOfState(room: Room) {
    setTimerNSendMsg(room, nextStateOfSeerCheck);
  },
};
