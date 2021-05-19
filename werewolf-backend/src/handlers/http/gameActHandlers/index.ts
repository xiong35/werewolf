import { Context } from "koa";

import { GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
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

export type ActHandler = (
  room: Room,
  player: Player,
  target: number,
  ctx: Context
) => Promise<Response>;

export const status2Handler: Record<GameStatus, ActHandler> = {
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
