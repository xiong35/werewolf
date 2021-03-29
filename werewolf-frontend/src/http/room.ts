import request from "./_request";

import {
  CreateRoomRequest,
  CreateRoomResponse,
} from "../../shared/httpMsg/CreateRoomMsg";
import {
  JoinRoomResponse,
  JoinRoomRequest,
} from "../../shared/httpMsg/JoinRoomMsg";

export async function createRoom(
  data: CreateRoomRequest
): Promise<CreateRoomResponse> {
  const res = (await request({
    url: "/room/create",
    method: "POST",
    data,
  })) as unknown;

  return res as CreateRoomResponse;
}

export async function joinRoom(
  data: JoinRoomRequest
): Promise<JoinRoomResponse> {
  const res = (await request({
    url: "/room/join",
    method: "POST",
    data,
  })) as unknown;

  return res as JoinRoomResponse;
}
