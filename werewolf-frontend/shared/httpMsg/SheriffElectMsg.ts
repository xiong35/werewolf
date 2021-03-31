import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SheriffElectRequest {
  joinVote: boolean;
}

export interface SheriffElectResponse {
  status: number;
  msg: string;
  data: object;
}
