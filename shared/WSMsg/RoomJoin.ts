import { ID } from "../models";

export interface RoomJoinMsg {
  name: string; // 加入的玩家名
  id: ID; // 加入的玩家 ID
}
