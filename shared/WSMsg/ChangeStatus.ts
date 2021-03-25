import { day, ID, PublicPlayerModel } from "../models";
import { GameState, Potion } from "../defines";

export interface ChangeStatusMsg {
  day: day; // 当前天数
  setStatus: GameState;
  publicMsg: PublicMsg;
  curPlayerStatus: PublicPlayerModel[];
}

type PublicMsg = SheriffElectMsg | DayMsg;

export interface DayMsg {
  die?: ID;
}

export interface SheriffElectMsg {
  inElection: ID[]; // 上警的玩家 id
}

export interface WitchMsg {
  die?: ID;
  potionLeft: Potion[];
}

export interface GuardMsg {
  lastNight?: ID;
}
