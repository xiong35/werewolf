import { ID, index } from "../models";
import {} from "../defines";

export interface WolfKillRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  for: index; // 杀谁
}

export interface WolfKillResponse {
  status: number;
  msg: string;
  data: object;
}
