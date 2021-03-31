import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SheriffVoteRequest {
  roomNumber: string; // 当前房间号
  for: index;
}

export interface SheriffVoteResponse {
  status: number;
  msg: string;
  data: object;
}
