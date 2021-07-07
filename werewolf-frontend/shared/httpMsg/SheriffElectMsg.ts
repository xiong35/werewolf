import {} from "../GameDefs";
import { index } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface SheriffElectRequest {
  joinVote: boolean;
}

export type SheriffElectResponse = HttpRes; // TODO type = ?
