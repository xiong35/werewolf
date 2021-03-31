import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface WolfKillRequest {
  roomNumber: string; // 当前房间号
  for: index; // 杀谁
}

export interface WolfKillResponse {
  status: number;
  msg: string;
  data: object;
}
