import { index } from "../ModelDefs";
import { Potion } from "../GameDefs";

export interface WitchActRequest {
  roomNumber: string; // 当前房间号
  for: index;
  use: Potion;
}

export interface WitchActResponse {
  status: number;
  msg: string;
  data: object;
}
