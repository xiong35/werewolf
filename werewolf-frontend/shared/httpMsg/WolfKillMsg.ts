import { index } from "../ModelDefs";
import CharacterAct from "./CharacterAct";

export interface WolfKillRequest extends CharacterAct {}

export interface WolfKillResponse {
  status: number;
  msg: string;
  data: object;
}
