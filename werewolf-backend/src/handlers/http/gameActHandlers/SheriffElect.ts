  
import io from "src";
import {
  choosePublicInfo,
  PlayerProps,
} from "src/models/PlayerModel";
import Room, {
  listAllOfRoom,
  RoomProps,
} from "src/models/RoomModel";
import { dieCheckout } from "src/utils/dieCheckout";
import { ActHandler, Response } from ".";
import { GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";


export const SheriffElectHandler: ActHandler = async (
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

export async function finishSheriffElect(
  roomNumber: string
): Promise<Response> {
  return {
    status: 200,
    msg: "ok",
    data: {},
  };
}

