import { day, PublicPlayerDef, index } from "../ModelDefs";
import { GameStatus, Potion } from "../GameDefs";

export interface ChangeStatusMsg {
  day: day; // 当前天数
  setStatus: GameStatus;
  publicMsg: PublicMsg;
  timeout: number; // 有多少秒可以确认
  curPlayerStatus: PublicPlayerDef[];
}

type PublicMsg = SheriffElectMsg | NightMsg | VoteResultMsg | {};

export interface NightMsg {
  die: index;
}

export interface SheriffElectMsg {
  candidates: index[]; // 参与警长竞选的玩家 id
}

export interface VoteResultMsg {
  result: index; // 票数最多的玩家 id
  for: "SHERIFF" | "EXILE";
}

export interface WitchMsg {
  die?: index;
  potionLeft: Potion[];
}

export interface GuardMsg {
  lastNight?: index;
}
