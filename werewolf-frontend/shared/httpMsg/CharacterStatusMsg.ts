import { PublicPlayerDef, CharacterStatus } from "../ModelDefs";
import { Character } from "../GameDefs";

export interface CharacterStatusRequest {}

export interface CharacterStatusResponse {
  status: number;
  msg: string;
  data: {
    players: PublicPlayerDef[];
    curCharacter: Character;
    curStatus: CharacterStatus;
  };
}
