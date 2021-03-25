import { index } from "../models";

export interface RoomJoinMsg {
  name: string; // 加入的玩家名
  index: index; // 加入的玩家编号
}
