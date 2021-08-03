import { GameStatus, StatusWithAction } from "../../../../../werewolf-frontend/shared/GameDefs";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";

/**
 * 检验此玩家是否能在当前阶段发送请求
 * @param room
 * @param player
 * @return {boolean} 是否合规
 */
export function validateIdentity(
  room: Room,
  player: Player
): true | string {
  const gameStatus = room.curStatus;

  switch (gameStatus) {
    case GameStatus.HUNTER_SHOOT:
      return (
        (player.character === "HUNTER" &&
          room.curDyingPlayer._id === player._id) ||
        "你不是猎人"
      );
    case GameStatus.SHERIFF_ASSIGN:
      return (
        (player.isSheriff &&
          room.curDyingPlayer._id === player._id) ||
        "你不是警长"
      );
    case GameStatus.LEAVE_MSG:
      return (
        (player.isDying &&
          room.curDyingPlayer._id === player._id) ||
        "你不能发表遗言"
      );
  }

  if (!player.isAlive) return "你已经是个死人了"; // 除了猎人和警长或者结束发言, 都必须明面上活着才能进行操作

  switch (gameStatus as StatusWithAction) {
    case GameStatus.WOLF_KILL:
      return player.character === "WEREWOLF" || "你不是狼人";
    case GameStatus.SEER_CHECK:
      return player.character === "SEER" || "你不是预言家";
    case GameStatus.WITCH_ACT:
      return player.character === "WITCH" || "你不是女巫";
    case GameStatus.GUARD_PROTECT:
      return player.character === "GUARD" || "你不是守卫";
    case GameStatus.DAY_DISCUSS:
      return (
        room.toFinishPlayers.has(player.index) || "你不能发言"
      );
    case GameStatus.SHERIFF_ELECT:
    case GameStatus.EXILE_VOTE:
    case GameStatus.SHERIFF_VOTE:
      return true;
    case GameStatus.SHERIFF_SPEECH:
      return player.canBeVoted || "你不能发言"; // TODO 改成  room.toFinishPlayers.has(player.index) ?
  }

  // TODO 检查是否有遗漏的状态

  return "操作不合法";
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
