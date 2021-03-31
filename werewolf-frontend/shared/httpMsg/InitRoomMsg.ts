import { PublicPlayerDef } from "../ModelDefs";
import { Character } from "../GameDefs";

export interface InitRoomRequest {}

export interface InitRoomResponse {
  status: number;
  msg: string;
  data: {
    players: PublicPlayerDef[]; // 已有的角色
    needingCharacters: Character[];
  };
}
