import { ID, index } from "../models";
import {} from "../defines";

export interface SheriffAssignRequest {
  ID: ID; // 鉴权用的 ID
  roomNumber: string; // 当前房间号
  to: index; // 警徽传给谁, -1代表撕掉
}

export interface SheriffAssignResponse {
  status: number;
  msg: string;
  data: object;
}
