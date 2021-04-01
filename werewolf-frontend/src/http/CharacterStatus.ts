import request from "./_request";

import {
  CharacterStatusRequest,
  CharacterStatusResponse,
} from "../../shared/httpMsg/CharacterStatusMsg";

export async function createRoom(
  data: CharacterStatusRequest
): Promise<CharacterStatusResponse> {
  const res = (await request({
    url: "/play/characterStatus",
    method: "POST",
    data,
  })) as unknown;

  return res as CharacterStatusResponse;
}
