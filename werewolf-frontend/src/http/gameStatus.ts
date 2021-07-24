import { GameStatusRequest, GameStatusResponse } from "../../shared/httpMsg/GameStatusMsg";
import request from "./_request";

export async function getGameStatus(
  data: GameStatusRequest
): Promise<GameStatusResponse | null> {
  const res = await request<GameStatusResponse>({
    url: "/game/status",
    method: "POST",
    data,
  });

  if (!res || res.status !== 200) {
    return null;
  }

  return res.data;
}
