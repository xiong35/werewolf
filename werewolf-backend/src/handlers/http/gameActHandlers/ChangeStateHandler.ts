import { Room } from "src/models/RoomModel";

import { Character, GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";

export type GetNextState = (
  room: Room,
  extra?: unknown
) => GameStatus;

// TODO 责任链?
export const nextStateOfWerewolf: GetNextState = (room, extra) => {
  if (
    room.needingCharacters.includes("WEREWOLF") &&
    room.gameStatus[room.gameStatus.length - 1] !==
      GameStatus.WOLF_KILL
  )
    return GameStatus.WOLF_KILL;

  return nextStateOfSeer(room, extra);
};

export const nextStateOfSeer: GetNextState = (room, extra) => {
  if (
    room.needingCharacters.includes("SEER") &&
    room.gameStatus[room.gameStatus.length - 1] !==
      GameStatus.SEER_CHECK
  )
    return GameStatus.SEER_CHECK;

  return nextStateOfWitch(room, extra);
};

export const nextStateOfWitch: GetNextState = (room, extra) => {
  if (
    room.needingCharacters.includes("WITCH") &&
    room.gameStatus[room.gameStatus.length - 1] !==
      GameStatus.WITCH_ACT
  )
    return GameStatus.WITCH_ACT;

  return nextStateOfGuard(room, extra);
};

export const nextStateOfGuard: GetNextState = (room, extra) => {
  if (
    room.needingCharacters.includes("GUARD") &&
    room.gameStatus[room.gameStatus.length - 1] !==
      GameStatus.GUARD_PROTECT
  )
    return GameStatus.GUARD_PROTECT;

  return nextStateOfHunterCheck(room, extra);
};

export const nextStateOfHunterCheck: GetNextState = (
  room,
  extra
) => {
  if (
    room.needingCharacters.includes("HUNTER") &&
    room.gameStatus[room.gameStatus.length - 1] !==
      GameStatus.GUARD_PROTECT
  )
    return GameStatus.GUARD_PROTECT;

  return nextStateOfGuard(room, extra);
};
