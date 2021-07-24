import { Vote } from "../../src/utils/votes";
import { Character, GameStatus } from "../GameDefs";
import { day, GameEvent, index, PlayerDef, PublicPlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface GameStatusRequest {}

export type GameStatusResponse = {
  players: PublicPlayerDef[];
  self: PlayerDef;
  curDay: day;
  gameStatus: GameStatus;
};
