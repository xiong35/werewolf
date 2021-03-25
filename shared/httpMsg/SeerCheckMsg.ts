import { ID, index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SeerCheckRequest {
  ID: ID; // 鉴权用的 ID
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
