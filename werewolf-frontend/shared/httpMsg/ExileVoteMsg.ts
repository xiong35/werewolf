import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface ExileVoteRequest {
  for: index;
}

export interface ExileVoteResponse {
  status: number;
  msg: string;
  data: object;
}
