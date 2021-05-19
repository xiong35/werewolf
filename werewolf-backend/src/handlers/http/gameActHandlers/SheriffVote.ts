  
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { dieCheckout } from "src/utils/dieCheckout";
import { getToDieFromVotes } from "src/utils/getToDieFromVotes";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { ActHandler, Response } from "./";

export const SheriffVoteHandler: ActHandler = async (
  room,
  player,
  target,
  ctx
) => {

  
  return {
    status: 200,
    msg: "ok",
    data: {},
  };
};

export async function finishSheriffVote(
  roomNumber: string
): Promise<Response> {
  return {
    status: 200,
    msg: "ok",
    data: {},
  };
}

