import { GameStatus } from "../GameDefs";
import { day } from "../ModelDefs";

export interface ChangeStatusMsg {
  setDay: day; // 设置当前天数
  setStatus: GameStatus;
  timeout: number; // 有多少秒可以确认
}
