import {
  PublicPlayerDef,
  CharacterStatus,
  GameEvent,
  day,
  PlayerDef,
} from "../ModelDefs";
import { Character, GameStatus } from "../GameDefs";

export interface GameStatusRequest {}

export interface GameStatusResponse {
  status: number;
  msg: string;
  data: {
    players: PublicPlayerDef[];
    self: PlayerDef;

    curCharacter: Character;
    curStatus: CharacterStatus;

    events: GameEvent[]; // TODO get data on open menu?

    curDay: day;
    gameStatus?: GameStatus;
  };
}
