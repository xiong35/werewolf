import { index } from "../ModelDefs";
import { Potion } from "../GameDefs";

export interface WitchActRequest {
  for: index;
  use: Potion;
}

export interface WitchActResponse {
  status: number;
  msg: string;
  data: object;
}
