import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface HunterCheckRequest {
  roomNumber: string; // 当前房间号
}

export interface HunterCheckResponse {
  status: number;
  msg: string;
  data: object;
}
