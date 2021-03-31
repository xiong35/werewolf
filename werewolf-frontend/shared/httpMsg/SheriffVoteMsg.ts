import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SheriffVoteRequest {
  for: index;
}

export interface SheriffVoteResponse {
  status: number;
  msg: string;
  data: object;
}
