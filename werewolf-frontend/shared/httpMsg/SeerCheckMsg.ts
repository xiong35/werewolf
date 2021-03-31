import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SeerCheckRequest {
  roomNumber: string; // 当前房间号
  for: index;
}

export interface SeerCheckResponse {
  status: number;
  msg: string;
  data: {
    isWolf: boolean;
  };
}
