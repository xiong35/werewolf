import { Character, GameStatus, TIMEOUT } from "../../../shared/GameDefs";
import { ChangeStatusMsg } from "../../../shared/WSMsg/ChangeStatus";
import { date, gameStatus, self } from "../../reactivity/game";
/*  */
import { allBeforeDayDiscuss } from "./allBeforeDayDiscuss";
import { allExileVote } from "./allExileVote";
import { allExileVoteCheck } from "./allExileVoteCheck";
import { allSheriffElect } from "./allSheriffElect";
import { allSheriffVote } from "./allSheriffVote";
import { allSheriffVoteCheck } from "./allSheriffVoteCheck";
import { guardProtect } from "./guardProtect";
import { hunterCheck } from "./hunterCheck";
import { hunterShoot, waitHunterShoot } from "./hunterShoot";
import { leaveMsg, waitLeaveMsg } from "./leaveMsg";
import { seerCheck } from "./seerCheck";
import { sheriffAssign, waitSheriffAssign } from "./sheriffAssign";
import { witchAct } from "./witchAct";
import { wolfKill } from "./wolfKill";
import { wolfKillCheck } from "./wolfKillCheck";

/**
 * 哪些事件需要被哪些角色响应\
 * 若 value 为数组, 则表示仅包含的角色需要响应, 其他人不动\
 * 若为函数, 则所有角色统一调用此函数
 */
const respondMap: Record<
  GameStatus,
  Partial<Record<Character, Function>>[] | Function
> = {
  [GameStatus.WOLF_KILL]: [{ WEREWOLF: wolfKill }],
  [GameStatus.WOLF_KILL_CHECK]: [{ WEREWOLF: wolfKillCheck }],
  [GameStatus.SEER_CHECK]: [{ SEER: seerCheck }],
  [GameStatus.WITCH_ACT]: [{ WITCH: witchAct }],
  [GameStatus.GUARD_PROTECT]: [{ GUARD: guardProtect }],
  [GameStatus.HUNTER_CHECK]: [{ HUNTER: hunterCheck }],
  [GameStatus.SHERIFF_ELECT]: allSheriffElect,
  [GameStatus.SHERIFF_VOTE]: allSheriffVote,
  [GameStatus.SHERIFF_VOTE_CHECK]: allSheriffVoteCheck,
  [GameStatus.SHERIFF_ASSIGN]: sheriffAssign,
  [GameStatus.BEFORE_DAY_DISCUSS]: allBeforeDayDiscuss,
  [GameStatus.DAY_DISCUSS]: allBeforeDayDiscuss,
  [GameStatus.EXILE_VOTE]: allExileVote,
  [GameStatus.EXILE_VOTE_CHECK]: allExileVoteCheck,
  [GameStatus.HUNTER_SHOOT]: hunterShoot,
  [GameStatus.LEAVE_MSG]: leaveMsg,
};

export default function changeStatus(msg: ChangeStatusMsg) {
  date.value = msg.setDay;
  gameStatus.value = msg.setStatus;

  const handlers = respondMap[msg.setStatus];
  if (typeof handlers === "function") {
  } else {
    const char = (self.value && self.value.character) || "";
    const specialHandlerObj = handlers.find((obj) => char in obj);
    if (!specialHandlerObj) return;
    const spacialHandler = specialHandlerObj[char];
    if (spacialHandler == undefined) return;
    else spacialHandler();
  }
  // TODO 加注释
  // TODO 实现handlers
}
