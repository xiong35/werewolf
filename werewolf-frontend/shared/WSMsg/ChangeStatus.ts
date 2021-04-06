import { day, PublicPlayerDef, index } from "../ModelDefs";
import { GameStatus, Potion } from "../GameDefs";

export interface ChangeStatusMsg {
  day: day; // 当前天数
  setStatus: GameStatus;
  publicMsg: PublicMsg;
  timeout: number; // 有多少秒可以确认
  curPlayerStatus: PublicPlayerDef[];
}

type PublicMsg = VoteMsg | DayMsg;

export interface DayMsg {
  die?: index;
}

export interface VoteMsg {
  choices: index[]; // 被投票的玩家 id
  for: "SHERIFF" | "EXILE";
}

export interface WitchMsg {
  die?: index;
  potionLeft: Potion[];
}

export interface GuardMsg {
  lastNight?: index;
}
