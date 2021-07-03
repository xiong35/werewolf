import { Context } from "koa";

import { GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { DayDiscussHandler } from "./DayDiscuss";
import { ExileVoteHandler } from "./ExileVote";
import { GuardProtectHandler } from "./GuardProtect";
import { HunterCheckHandler } from "./HunterCheck";
import { HunterShootHandler } from "./HunterShoot";
import { LeaveMsgHandler } from "./LeaveMsg";
import { SeerCheckHandler } from "./SeerCheck";
import { SheriffAssignHandler } from "./SheriffAssign";
import { SheriffElectHandler } from "./SheriffElect";
import { SheriffVoteHandler } from "./SheriffVote";
import { WitchActHandler } from "./WitchAct";
import { WolfKillHandler } from "./WolfKill";

export interface Response<T = {}> {
  status: number;
  msg: string;
  data: T;
}

export interface GameActHandler {
  /** 在 koa 中被调用, 是处理函数的入口
   * 对游戏状态做出改变, 并在玩家完成操作后取消定时器且手动设置进入下一状态
   */
  mainHandler: (
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) => Promise<Response>;
  /** 在 mainHandler 中被调用
   * 在玩家做出选择或定时器到点时调用, 设置进入下一状态并开启结束下一状态的定时器
   */
  finishCurrentState: (room: Room) => Promise<Response>;
}

export const status2Handler: Record<GameStatus, GameActHandler> = {
  [GameStatus.DAY_DISCUSS]: DayDiscussHandler,
  [GameStatus.LEAVE_MSG]: LeaveMsgHandler,
  [GameStatus.HUNTER_CHECK]: HunterCheckHandler,
  [GameStatus.EXILE_VOTE]: ExileVoteHandler,
  [GameStatus.GUARD_PROTECT]: GuardProtectHandler,
  [GameStatus.HUNTER_SHOOT]: HunterShootHandler,
  [GameStatus.SEER_CHECK]: SeerCheckHandler,
  [GameStatus.SHERIFF_ASSIGN]: SheriffAssignHandler,
  [GameStatus.SHERIFF_ELECT]: SheriffElectHandler,
  [GameStatus.SHERIFF_VOTE]: SheriffVoteHandler,
  [GameStatus.WITCH_ACT]: WitchActHandler,
  [GameStatus.WOLF_KILL]: WolfKillHandler,
};
