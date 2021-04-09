import { index } from "../ModelDefs";
import CharacterAct from "./CharacterAct";

export interface SeerCheckRequest extends CharacterAct {}

export interface SeerCheckResponse {
  status: number;
  msg: string;
  data: {
    isWolf: boolean;
  };
}
