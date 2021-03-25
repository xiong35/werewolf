import { ID, index } from "../models";
import {} from "../defines";

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
