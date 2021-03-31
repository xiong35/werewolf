import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface HunterShootRequest {
  to: index;
}

export interface HunterShootResponse {
  status: number;
  msg: string;
  data: {};
}
