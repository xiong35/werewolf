import { index } from "../ModelDefs";
import CharacterAct from "./CharacterAct";

export interface SheriffVoteRequest extends CharacterAct {}

export interface SheriffVoteResponse {
  status: number;
  msg: string;
  data: object;
}
