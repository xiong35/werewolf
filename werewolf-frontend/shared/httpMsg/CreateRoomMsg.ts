import { Character } from "../GameDefs";
import { ID, index } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface CreateRoomRequest {
  characters: Character[];
  password?: string;
  name: string;
}

export type CreateRoomResponse = HttpRes<{
  roomNumber: string;
  ID: ID;
}>;
