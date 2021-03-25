import { ID, index } from "../models";
import {} from "../defines";

export interface SheriffElectRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  joinVote: boolean;
}

export interface SheriffElectResponse {
  status: number;
  msg: string;
  data: object;
}
