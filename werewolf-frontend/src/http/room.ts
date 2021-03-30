import request from "./_request";

import {
  CreateRoomRequest,
  CreateRoomResponse,
} from "../../shared/httpMsg/CreateRoomMsg";
import {
  JoinRoomResponse,
  JoinRoomRequest,
} from "../../shared/httpMsg/JoinRoomMsg";
import {
  InitRoomResponse,
  InitRoomRequest,
} from "../../shared/httpMsg/InitRoomMsg";

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

export async function initRoom(
  data: InitRoomRequest
): Promise<InitRoomResponse> {
  const res = (await request({
    url: "/room/init",
    method: "POST",
    data,
  })) as unknown;

  return res as InitRoomResponse;
}
