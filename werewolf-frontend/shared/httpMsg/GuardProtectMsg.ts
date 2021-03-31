import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface GuardProtectRequest {
  for: index;
}

export interface GuardProtectResponse {
  status: number;
  msg: string;
  data: object;
}
