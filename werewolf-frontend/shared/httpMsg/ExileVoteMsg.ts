import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface ExileVoteRequest {
  roomNumber: string; // 当前房间号
  for: index;
}

export interface ExileVoteResponse {
  status: number;
  msg: string;
  data: object;
}
