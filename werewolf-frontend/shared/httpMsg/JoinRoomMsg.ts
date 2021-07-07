import { Character } from "../GameDefs";
import { ID, index } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface JoinRoomRequest {
  name: string; // 昵称
  password?: string; // 哈希过的密码
  roomNumber: string; // 六位房间号
}

export type JoinRoomResponse = HttpRes<{
  ID: ID; // token
  index: index;
  needingCharacters: Character[]; // 设置的人物
  open?: boolean; // 是否直接开始
}>;
