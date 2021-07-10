import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";

import { GameStatus, StatusWithAction } from "../../../../../werewolf-frontend/shared/GameDefs";

/**
 * 检验此玩家是否能在当前阶段发送请求
 * @param room
 * @param player
 * @return {boolean} 是否合规
 */
export function validateIdentity(
  room: Room,
  player: Player
): boolean {
  const gameStatus = room.curStatus;

  switch (gameStatus) {
    case GameStatus.HUNTER_SHOOT:
      return (
        player.character === "HUNTER" &&
        room.curDyingPlayer._id === player._id
      );
    case GameStatus.SHERIFF_ASSIGN:
      return (
        player.isSheriff && room.curDyingPlayer._id === player._id
      );
  }

  if (!player.isAlive) return false; // 除了猎人和警长, 都必须明面上活着才能进行操作

  switch (gameStatus as StatusWithAction) {
    case GameStatus.WOLF_KILL:
      return player.character === "WEREWOLF";
    case GameStatus.SEER_CHECK:
      return player.character === "SEER";
    case GameStatus.WITCH_ACT:
      return player.character === "WITCH";
    case GameStatus.GUARD_PROTECT:
      return player.character === "GUARD";
    case GameStatus.DAY_DISCUSS:
      return room.toFinishPlayers.has(player.index);
    case GameStatus.SHERIFF_ELECT:
    case GameStatus.EXILE_VOTE:
    case GameStatus.SHERIFF_VOTE:
      return true;
    case GameStatus.SHERIFF_SPEECH:
      return player.canBeVoted;
    case GameStatus.LEAVE_MSG:
      return (
        player.isDying && room.curDyingPlayer._id === player._id
      );
  }

  // TODO 检查是否有遗漏的状态

  return false;
}
/* 

  SHERIFF_VOTE = "投票选警长",
  SHERIFF_VOTE_CHECK = "警长投票结果",
  SHERIFF_ASSIGN = "指派警长",
  BEFORE_DAY_DISCUSS = "夜晚结算",
  DAY_DISCUSS = "自由发言",
  EXILE_VOTE = "票选狼人",
  EXILE_VOTE_CHECK = "票选狼人结果",
  HUNTER_SHOOT = "猎人开枪",
  LEAVE_MSG = "留遗言",
 */
