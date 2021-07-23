import { CreateRoomRequest, CreateRoomResponse } from "../../shared/httpMsg/CreateRoomMsg";
import { InitRoomRequest, InitRoomResponse } from "../../shared/httpMsg/InitRoomMsg";
import { JoinRoomRequest, JoinRoomResponse } from "../../shared/httpMsg/JoinRoomMsg";
import request from "./_request";

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
): Promise<JoinRoomResponse | null> {
  const res = (await request({
    url: "/room/join",
    method: "POST",
    data,
  })) as unknown;

  return res as JoinRoomResponse;
}

export async function initRoom(
  data: InitRoomRequest
): Promise<InitRoomResponse | null> {
  const res = (await request({
    url: "/room/init",
    method: "POST",
    data,
  })) as unknown;

  return res as InitRoomResponse;
}

export async function gameBegin(): Promise<boolean> {
  const res = await request({
    url: "/game/begin",
    method: "POST",
  });

  return res.status === 200;
}
