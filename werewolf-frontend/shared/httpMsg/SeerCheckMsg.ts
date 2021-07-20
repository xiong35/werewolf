import { index } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";
import CharacterAct from "./CharacterAct";

export interface SeerCheckRequest extends CharacterAct {}

export type SeerCheckData = {
  isWolf: boolean;
};
