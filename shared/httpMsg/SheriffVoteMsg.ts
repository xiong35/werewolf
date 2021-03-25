import { ID, index } from "../models";
import {} from "../defines";

export interface SheriffVoteRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  for: index;
}

export interface SheriffVoteResponse {
  status: number;
  msg: string;
  data: object;
}
