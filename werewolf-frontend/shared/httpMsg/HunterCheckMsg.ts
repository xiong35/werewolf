import { index } from "../ModelDefs";
import {} from "../GameDefs";

export interface HunterCheckRequest {}

export interface HunterCheckResponse {
  status: number;
  msg: string;
  data: object;
}
