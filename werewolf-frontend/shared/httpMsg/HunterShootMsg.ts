import { index } from "../ModelDefs";
import CharacterAct from "./CharacterAct";

export interface HunterShootRequest extends CharacterAct {}

export interface HunterShootResponse {
  status: number;
  msg: string;
  data: {};
}
