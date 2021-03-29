import { ID, index } from "../ModelDefs";
import { Potion } from "../GameDefs";

export interface WitchActRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  for: index;
  use: Potion;
}

export interface WitchActResponse {
  status: number;
  msg: string;
  data: object;
}
