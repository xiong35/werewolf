import { ID, index } from "../ModelDefs";
import {} from "../GameDefs";

export interface HunterCheckRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
}

export interface HunterCheckResponse {
  status: number;
  msg: string;
  data: object;
}
