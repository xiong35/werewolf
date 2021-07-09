import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";

import {
  GameStatus,
  TIMEOUT,
} from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import {
  GameActHandler,
  Response,
  startCurrentState,
  status2Handler,
} from "./";
import { nextStateOfWolfKillCheck } from "./ChangeStateHandler";
import { SeerCheckHandler } from "./SeerCheck";

export const WolfKillCheckHandler: GameActHandler = {
  curStatus: GameStatus.WOLF_KILL_CHECK,

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

  startOfState(room: Room): void {
    startCurrentState(this, room);
  },

  async endOfState(room: Room) {
    SeerCheckHandler.startOfState(room);
  },
};
