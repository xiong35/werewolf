import { Context } from "koa";
import io from "src";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { GetNextState } from "./ChangeStateHandler";
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
  [GameStatus.BEFORE_DAY_DISCUSS]: BeforeDayDiscussHandler,
};

/**
 * 根据传入的 getNextState 获得下一状态\
 * 向玩家通知状态发生改变并设置下一状态结束的定时器
 * @param room 当前房间
 * @param getNextState 获得下一状态的函数
 */
export function setTimerNSendMsg(
  room: Room,
  getNextState: GetNextState
) {
  // 通知所有人更新状态
  const nextState = getNextState(room);
  const timeout = TIMEOUT[nextState];
  io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
    setDay: room.currentDay,
    setStatus: nextState,
    timeout,
  } as ChangeStatusMsg);

  // 设置下一状态的定时器
  const endOfNextState = status2Handler[nextState].endOfState;
  clearTimeout(room.timer);
  room.timer = setTimeout(
    () => endOfNextState(room),
    timeout * 1000
  );
}
