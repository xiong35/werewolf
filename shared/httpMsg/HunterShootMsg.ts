import { ID, index } from "../ModelDefs";
import {} from "../GameDefs";

export interface HunterShootRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  to: index;
}

export interface HunterShootResponse {
  status: number;
  msg: string;
  data: {};
}
