import io from "src";
import { Room } from "src/models/RoomModel";

import { Character, GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";

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
  // 当执行到这里的时候, 意味着下一个状态就是到白天了
  // 此时应该让天数加一
  room.currentDay++;

  if (room.currentDay === 1) {
    return GameStatus.SHERIFF_ELECT;
  }

  // 当执行到这里的时候, 意味着下一个状态就是
  // BEFORE_DAY_DISCUSS, 正准备开启他的定时器
  // 此时应该进行夜晚的结算并通知所有人获得晚上的消息了

  // 将夜晚死的人的 isAlive 设为false
  room.players
    .filter((p) => {
      const iaKilledLastNight = p.die?.at === room.currentDay - 1;
      return iaKilledLastNight;
    })
    .forEach((p) => (p.isAlive = false));

  // 将女巫救的人复活
  const medicineStatus = room.players.find(
    (p) => p.character === "WITCH"
  )?.characterStatus?.MEDICINE;
  if (medicineStatus?.usedAt === room.currentDay - 1) {
    // 如果女巫昨晚用了药
    const savedPlayerInd = medicineStatus.usedAt;
    const savedLastNight = room.getPlayerByIndex(savedPlayerInd);
    if (savedLastNight) savedLastNight.isAlive = true;
  }
  // TODO 什么时候进行死亡结算?

  return GameStatus.BEFORE_DAY_DISCUSS;
};

export const nextStateOfSheriffElect: GetNextState = (
  room,
  extra
) => {
  return GameStatus.SHERIFF_SPEECH;
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
export const nextStateOfSheriffSpeech: GetNextState = (
  room,
  extra
) => {
  return GameStatus.SHERIFF_VOTE;
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
  // TODO 天数++

  return GameStatus.WOLF_KILL;
};

export const nextStateOfLeaveMsg: GetNextState = (room, extra) => {
  // TODO 通过参数指示下一个状态是什么?
  // TODO 天数++

  return GameStatus.WOLF_KILL;
};
