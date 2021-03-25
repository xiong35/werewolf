import { ID, index } from "../models";
import {} from "../defines";

export interface ExileVoteRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  for: index;
}

export interface ExileVoteResponse {
  status: number;
  msg: string;
  data: object;
}
