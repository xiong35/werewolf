import {
  PublicPlayerDef,
  CharacterStatus,
  GameEvent,
} from "../ModelDefs";
import { Character } from "../GameDefs";

export interface GameStatusRequest {}

export interface GameStatusResponse {
  status: number;
  msg: string;
  data: {
    players: PublicPlayerDef[];
    curCharacter: Character;
    curStatus: CharacterStatus;
    events: GameEvent[];
  };
}
