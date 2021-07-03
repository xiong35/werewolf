  
import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { dieCheckout } from "src/utils/dieCheckout";
import { getToDieFromVotes } from "src/utils/getToDieFromVotes";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";

export const HunterShootHandler: GameActHandler = {
  async mainHandler(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    return {
      status: 200,
      msg: "ok",
      data: {},
    };
  },

  async finishCurrentState(room: Room) {
    return {
      status: 200,
      msg: "ok",
      data: {},
    };
  },
};


