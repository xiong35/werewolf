import request from "./_request";

import {
  GameStatusRequest,
  GameStatusResponse,
} from "../../shared/httpMsg/GameStatusMsg";

export async function getGameStatus(
  data: GameStatusRequest
): Promise<GameStatusResponse> {
  const res = (await request({
    url: "/play/gameStatus",
    method: "POST",
    data,
  })) as unknown;

  return res as GameStatusResponse;
}
