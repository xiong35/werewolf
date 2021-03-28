import request from "./_request";

import {
  CreateRoomRequest,
  CreateRoomResponse,
} from "../../../shared/httpMsg/CreateRoomMsg";

export async function createRoom(
  data: CreateRoomRequest
): Promise<CreateRoomResponse> {
  const res = (await request({
    url: "/room/create",
    method: "GET",
    data,
  })) as unknown;

  return res as CreateRoomResponse;
}
