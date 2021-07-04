import { Character, GameStatus } from "../GameDefs";
import { day, GameEvent, PlayerDef, PublicPlayerDef } from "../ModelDefs";

export interface GameStatusRequest {}

export interface GameStatusResponse {
  status: number;
  msg: string;
  data: {
    players: PublicPlayerDef[];
    self: PlayerDef;

    curCharacter: Character;

    events: GameEvent[]; // TODO get data on open menu?

    curDay: day;
    gameStatus: GameStatus;
  };
}
