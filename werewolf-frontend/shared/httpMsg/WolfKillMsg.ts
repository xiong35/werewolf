import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface WolfKillRequest {
  for: index; // 杀谁
}

export interface WolfKillResponse {
  status: number;
  msg: string;
  data: object;
}
