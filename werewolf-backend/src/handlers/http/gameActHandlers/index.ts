import { Context } from "koa";

import { GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { DayDiscussHandler } from "./DayDiscuss";
import { ExileVoteHandler } from "./ExileVote";
import { ExileVoteCheckHandler } from "./ExileVoteCheck";
import { GuardProtectHandler } from "./GuardProtect";
import { HunterCheckHandler } from "./HunterCheck";
import { HunterShootHandler } from "./HunterShoot";
import { LeaveMsgHandler } from "./LeaveMsg";
import { SeerCheckHandler } from "./SeerCheck";
import { SheriffAssignHandler } from "./SheriffAssign";
import { SheriffElectHandler } from "./SheriffElect";
import { SheriffVoteHandler } from "./SheriffVote";
import { SheriffVoteCheckHandler } from "./SheriffVoteCheck";
import { WitchActHandler } from "./WitchAct";
import { WolfKillHandler } from "./WolfKill";
import { WolfKillCheckHandler } from "./WolfKillCheck";

export interface Response<T = {}> {
  status: number;
  msg: string;
  data: T;
}

export interface GameActHandler {
  /**
   * 在 koa 中被调用, 是处理玩家操作的函数\
   * 仅记录操作并返回操作结果, 多人操作则统一返回 ok
   */
  handleHttp: (
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) => Promise<Response>;
  /**
   * 链式调用\
   * 在上一个定时器到点时调用下一个状态的结束函数
   * 1. 对于结果
   *    - 单人操作: 直接返回操作结果
   *    - 多人操作: 用 socket 通知所有玩家主动拉取操作结果, 只给身份合法的人返回结果, 其他人不做处理
   * 2. 对于下一状态
   *    - 下一状态入栈
   *    - 改变天数?
   *    - 改变玩家状态
   *    - 开启下一状态的定时器
   */
  endOfState: (room: Room) => void;
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
  [GameStatus.EXILE_VOTE_CHECK]: ExileVoteCheckHandler,
  [GameStatus.WOLF_KILL_CHECK]: WolfKillCheckHandler,
  [GameStatus.SHERIFF_VOTE_CHECK]: SheriffVoteCheckHandler,
};
