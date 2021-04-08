import { GameStatus } from "../../shared/GameDefs";
import { showDialog } from "../reactivity/dialog";
import { gameStatus, character } from "../reactivity/game";
import { canAct } from "../reactivity/playPage";

export function checkStatus() {
  if (_canAct()) {
    showDialog("你现在可以行动了!");
    // TODO play sound
    canAct.value = true;
  } else {
    canAct.value = false;
  }
}

function _canAct(): boolean {
  switch (gameStatus.value) {
    case GameStatus.EXILE_VOTE:
    case GameStatus.SHERIFF_ELECT:
    case GameStatus.SHERIFF_VOTE:
      return true;

    case GameStatus.GUARD_PROTECT:
      return character.value === "GUARD";
    case GameStatus.HUNTER_CHECK:
    case GameStatus.HUNTER_SHOOT:
      return character.value === "HUNTER";
    case GameStatus.SEER_CHECK:
      return character.value === "SEER";
    case GameStatus.WITCH_ACT:
      return character.value === "WITCH";
    case GameStatus.WOLF_KILL:
      return character.value === "WEREWOLF";

    default:
      return false;
  }
}
