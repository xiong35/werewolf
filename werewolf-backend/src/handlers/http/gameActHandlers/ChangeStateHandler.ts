import { Room } from "src/models/RoomModel";

import { Character, GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";

/**
 * 根据现有房间状态判断下一游戏状态是什么, 若出现角色空缺则链式调用后续判断函数\
 * 调用此函数时所有状态均为最新状态
 */
export type GetNextState = (
  room: Room,
  extra?: unknown
) => GameStatus;

export const nextStateOfWolfKill: GetNextState = (room, extra) => {
  return GameStatus.WOLF_KILL_CHECK;
};

export const nextStateOfWolfKillCheck: GetNextState = (
  room,
  extra
) => {
  if (room.needingCharacters.includes("SEER"))
    return GameStatus.SEER_CHECK;

  return nextStateOfSeerCheck(room, extra);
};

export const nextStateOfSeerCheck: GetNextState = (
  room,
  extra
) => {
  if (room.needingCharacters.includes("WITCH"))
    return GameStatus.WITCH_ACT;

  return nextStateOfWitchAct(room, extra);
};

export const nextStateOfWitchAct: GetNextState = (room, extra) => {
  if (room.needingCharacters.includes("GUARD"))
    return GameStatus.GUARD_PROTECT;

  return nextStateOfGuardProtect(room, extra);
};

export const nextStateOfGuardProtect: GetNextState = (
  room,
  extra
) => {
  if (room.needingCharacters.includes("HUNTER"))
    return GameStatus.HUNTER_CHECK;

  return nextStateOfHunterCheck(room, extra);
};

export const nextStateOfHunterCheck: GetNextState = (
  room,
  extra
) => {
  if (room.currentDay === 1) return GameStatus.SHERIFF_ELECT;

  return GameStatus.BEFORE_DAY_DISCUSS;
};

export const nextStateOfSheriffElect: GetNextState = (
  room,
  extra
) => {
  return GameStatus.SHERIFF_VOTE;
};
export const nextStateOfSheriffVote: GetNextState = (
  room,
  extra
) => {
  return GameStatus.SHERIFF_VOTE_CHECK;
};
export const nextStateOfSheriffVoteCheck: GetNextState = (
  room,
  extra
) => {
  return GameStatus.BEFORE_DAY_DISCUSS;
};

export const nextStateOfBeforeDayDiscuss: GetNextState = (
  room,
  extra
) => {
  // TODO 判断谁死了
  return GameStatus.DAY_DISCUSS;
};

export const nextStateOfDayDiscuss: GetNextState = (
  room,
  extra
) => {
  return GameStatus.EXILE_VOTE;
};
export const nextStateOfExileVote: GetNextState = (
  room,
  extra
) => {
  return GameStatus.EXILE_VOTE_CHECK;
};
export const nextStateOfExileVoteCheck: GetNextState = (
  room,
  extra
) => {
  // TODO 判断谁死了

  return GameStatus.WOLF_KILL;
};

export const nextStateOfLeaveMsg: GetNextState = (room, extra) => {
  // TODO 指示下一个状态是什么?

  return GameStatus.WOLF_KILL;
};
