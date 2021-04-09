import { index } from "../ModelDefs";

import CharacterAct from "./CharacterAct";

export interface GuardProtectRequest extends CharacterAct {}

export interface GuardProtectResponse {
  status: number;
  msg: string;
  data: {};
}
