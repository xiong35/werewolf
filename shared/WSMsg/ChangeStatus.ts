import { day, PublicPlayerModel, index } from "../models";
import { GameState, Potion } from "../defines";

export interface ChangeStatusMsg {
  day: day; // 当前天数
  setStatus: GameState;
  publicMsg: PublicMsg;
  timeout: number; // 有多少秒可以确认
  curPlayerStatus: PublicPlayerModel[];
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
