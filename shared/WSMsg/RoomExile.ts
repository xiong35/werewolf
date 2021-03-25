import { ID } from "../models";

/**
 * Server to Client
 */
export interface RoomExileMsg {
  name: string; //  被 t 的昵称
  ID: ID; // 被 t 的 id
}
