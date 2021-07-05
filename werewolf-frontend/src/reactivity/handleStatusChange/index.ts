export type HandleStatusChange = () => boolean;

import { GameStatus } from "../../../shared/GameDefs";
import { showDialog } from "../dialog";
import { gameStatus } from "../game";
import { beforeDayDiscuss } from "./beforeDayDiscuss";
import { exileVote } from "./exileVote";
import { exileVoteCheck } from "./exileVoteCheck";
import { guardProtect } from "./guardProtect";
import { hunterCheck } from "./hunterCheck";
import { hunterShoot } from "./hunterShoot";
import { leaveMsg } from "./leaveMsg";
import { seerCheck } from "./seerCheck";
import { sheriffAssign } from "./sheriffAssign";
import { sheriffElect } from "./sheriffElect";
import { sheriffVote } from "./sheriffVote";
import { sheriffVoteCheck } from "./sheriffVoteCheck";
import { witchAct } from "./witchAct";
import { wolfKill } from "./wolfKill";
import { wolfKillCheck } from "./wolfKillCheck";

/**
 * 哪些事件需要被哪些角色响应
 */
const respondMap: Record<GameStatus, HandleStatusChange> = {
  [GameStatus.WOLF_KILL]: wolfKill,
  [GameStatus.WOLF_KILL_CHECK]: wolfKillCheck,
  [GameStatus.SEER_CHECK]: seerCheck,
  [GameStatus.WITCH_ACT]: witchAct,
  [GameStatus.GUARD_PROTECT]: guardProtect,
  [GameStatus.HUNTER_CHECK]: hunterCheck,
  [GameStatus.SHERIFF_ELECT]: sheriffElect,
  [GameStatus.SHERIFF_VOTE]: sheriffVote,
  [GameStatus.SHERIFF_VOTE_CHECK]: sheriffVoteCheck,
  [GameStatus.SHERIFF_ASSIGN]: sheriffAssign,
  [GameStatus.BEFORE_DAY_DISCUSS]: beforeDayDiscuss,
  [GameStatus.DAY_DISCUSS]: beforeDayDiscuss,
  [GameStatus.EXILE_VOTE]: exileVote,
  [GameStatus.EXILE_VOTE_CHECK]: exileVoteCheck,
  [GameStatus.HUNTER_SHOOT]: hunterShoot,
  [GameStatus.LEAVE_MSG]: leaveMsg,
};

export function handleStatusChange() {
  // 根据当前状态调用处理函数
  const shouldShowDialog = respondMap[gameStatus.value]();

  if (shouldShowDialog) {
    showDialog("轮到你行动了", 3);
  }
}
