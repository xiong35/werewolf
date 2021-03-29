import { ID, index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SheriffElectRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  joinVote: boolean;
}

export interface SheriffElectResponse {
  status: number;
  msg: string;
  data: object;
}
