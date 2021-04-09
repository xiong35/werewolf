import { index } from "../ModelDefs";
import CharacterAct from "./CharacterAct";

// 警徽传给谁, -1代表撕掉
export interface SheriffAssignRequest extends CharacterAct {}

export interface SheriffAssignResponse {
  status: number;
  msg: string;
  data: {};
}
