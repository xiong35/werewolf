import { GameStatusRequest, GameStatusResponse } from "../../shared/httpMsg/GameStatusMsg";
import request from "./_request";

export async function getGameStatus(
  data: GameStatusRequest
): Promise<GameStatusResponse | null> {
  const res = (await request({
    url: "/game/status",
    method: "POST",
    data,
  })) as unknown;

  return res as GameStatusResponse;
}
