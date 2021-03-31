import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface SeerCheckRequest {
  for: index;
}

export interface SeerCheckResponse {
  status: number;
  msg: string;
  data: {
    isWolf: boolean;
  };
}
