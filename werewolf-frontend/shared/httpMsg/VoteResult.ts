import { index } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export type VoteResultMsg = HttpRes<{
  hintText: string;
  result?: index[];
}>;
