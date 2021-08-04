import { Context } from "koa";

import io from "../../..";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { checkGameOver } from "../../../utils/checkGameOver";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { DayDiscussHandler } from "./DayDiscuss";
import { ExileVoteHandler } from "./ExileVote";
import { ExileVoteCheckHandler } from "./ExileVoteCheck";
import { GuardProtectHandler } from "./GuardProtect";
import { HunterCheckHandler } from "./HunterCheck";
import { HunterShootHandler } from "./HunterShoot";
import { LeaveMsgHandler } from "./LeaveMsg";
import { SeerCheckHandler } from "./SeerCheck";
import { SheriffAssignHandler } from "./SheriffAssign";
import { SheriffAssignCheckHandler } from "./SheriffAssignCheck";
import { SheriffElectHandler } from "./SheriffElect";
import { SheriffSpeachHandler } from "./SheriffSpeach";
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
   * 在状态中处理玩家发送到 http 请求(在此状态下进行的操作)
   * 在 koa 中被调用, 是在某个状态中处理玩家操作的函数\
   * 仅记录操作并返回操作结果, 多人操作则统一返回 ok
   */
  handleHttpInTheState: (
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
  /**
   * 在某个状态开始时调用
   * 1. 设置此状态结束的回调
   * 2. 通知玩家当前状态已经发生改变
   * 3. 通知设置天数
   */
  startOfState: (room: Room, ...rest: any) => void;

  /**
   * 在某个状态结束时调用
   * 1. 向玩家发送此状态的结果
   * 2. 根据局势判断要转移到什么状态
   * 3. 调用下一状态的 start
   */
  endOfState: (room: Room, ...rest: any) => void;

  curStatus: GameStatus;
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
  [GameStatus.SHERIFF_SPEECH]: SheriffSpeachHandler,
  [GameStatus.SHERIFF_VOTE]: SheriffVoteHandler,
  [GameStatus.WITCH_ACT]: WitchActHandler,
  [GameStatus.WOLF_KILL]: WolfKillHandler,
  [GameStatus.EXILE_VOTE_CHECK]: ExileVoteCheckHandler,
  [GameStatus.WOLF_KILL_CHECK]: WolfKillCheckHandler,
  [GameStatus.SHERIFF_VOTE_CHECK]: SheriffVoteCheckHandler,
  [GameStatus.BEFORE_DAY_DISCUSS]: BeforeDayDiscussHandler,
  [GameStatus.SHERIFF_ASSIGN_CHECK]: SheriffAssignCheckHandler,
};

/**
 * 设置当前没状态结束的定时器, 通知玩家修改状态
 */
export function startCurrentState(
  handler: GameActHandler,
  room: Room,
  ...extra: any
) {
  // 更新当前房间状态
  if (room.curStatus !== handler.curStatus) {
    room.gameStatus.push(handler.curStatus);
  }

  const timeout = TIMEOUT[handler.curStatus];
  // 设置此状态结束的回调
  clearTimeout(room.timer);
  room.timer = setTimeout(() => {
    handler.endOfState(room, ...extra);
  }, timeout * 1000);
  // 通知玩家当前状态已经发生改变, 并通知设置天数
  io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
    setDay: room.currentDay,
    setStatus: handler.curStatus,
    timeout,
  } as ChangeStatusMsg);
}

/**
 * 当前死亡结算正式结束, 设置此人 isDying 为 false\
 * 判断是否还有要进行死亡检查的人
 * 1. 如果有就把他设置为 curDyingPlayer, 进行 LeaveMsg
 * 2. 如果没有, 设置 curDyingPlayer 为 null, 进行 nextState, 并将他设为 null
 */
export function gotoNextStateAfterHandleDie(room: Room) {
  if (checkGameOver(room)) return;

  room.curDyingPlayer.isDying = false;
  room.curDyingPlayer.isAlive = false;

  const dyingPlayer = room.players.find((p) => p.isDying);
  // console.log("# index", room.players);
  // console.log("# index", { dyingPlayer });

  if (dyingPlayer) {
    room.curDyingPlayer = dyingPlayer;
    return LeaveMsgHandler.startOfState(room);
  } else {
    room.curDyingPlayer = null;
    // 单独处理, 从夜晚进入死亡结算再进入白天时
    // 将未结束发言的人设为所有活着的人
    // 同时设置能被投票的人为活着的
    if (room.nextStateOfDieCheck === GameStatus.DAY_DISCUSS) {
      room.toFinishPlayers = new Set(
        room.players.filter((p) => p.isAlive).map((p) => p.index)
      );
      room.players.forEach((p) => (p.canBeVoted = p.isAlive));
    }
    status2Handler[room.nextStateOfDieCheck].startOfState(room);
    room.nextStateOfDieCheck = null;
  }
}
