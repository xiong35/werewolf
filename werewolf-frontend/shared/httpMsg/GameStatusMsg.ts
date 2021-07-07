import { Character, GameStatus } from "../GameDefs";
import { day, GameEvent, PlayerDef, PublicPlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface GameStatusRequest {}

export type GameStatusResponse = HttpRes<{
  players: PublicPlayerDef[];
  self: PlayerDef;

  events: GameEvent[]; // TODO get data on open menu?

  curDay: day;
  gameStatus: GameStatus;
}>;
