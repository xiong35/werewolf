import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface HunterShootRequest {
  roomNumber: string; // 当前房间号
  to: index;
}

export interface HunterShootResponse {
  status: number;
  msg: string;
  data: {};
}
