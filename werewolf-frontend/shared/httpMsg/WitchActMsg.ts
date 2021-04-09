import CharacterAct from "./CharacterAct";
import { Potion } from "../GameDefs";

export interface WitchActRequest extends CharacterAct {
  use: Potion;
}

export interface WitchActResponse {
  status: number;
  msg: string;
  data: {};
}
