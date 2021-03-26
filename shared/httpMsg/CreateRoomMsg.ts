import { ID, index } from "../ModelDefs";
import { Character } from "../GameDefs";

export interface CreateRoomRequest {
  characters: Character[];
  password?: string;
  name: string;
}

export interface CreateRoomResponse {
  status: number;
  msg: string;
  data: {
    roomNumber: string;
  };
}
