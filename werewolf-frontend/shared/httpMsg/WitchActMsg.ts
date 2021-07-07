import { Potion } from "../GameDefs";
import { HttpRes } from "./_httpResTemplate";
import CharacterAct from "./CharacterAct";

export interface WitchActRequest extends CharacterAct {
  use: Potion;
}

export type WitchActResponse = HttpRes;
