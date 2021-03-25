import { index } from "../models";

/**
 * Server to Client
 */
export interface RoomExileMsg {
  name: string; //  被 t 的昵称
  index: index; // 被 t 的序号
}
