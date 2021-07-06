import { GameStatus } from "../../../shared/GameDefs";
import { gameStatus } from "../../reactivity/game";
import { isActing, target } from "../../reactivity/playAction";
import { showActions } from "../../reactivity/playPage";

/** 每个操作都需要做的事, 如关闭操作面板等 */
export function commonAction() {
  showActions.value = false;
  isActing.value = true;
  target.value = -1;
  gameStatus.value = GameStatus.EXILE_VOTE;
}
