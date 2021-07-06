import { isActing, noTarget, target } from "../../reactivity/playAction";
import { showActions } from "../../reactivity/playPage";

/** 每个操作都需要做的事, 如关闭操作面板等 */
export function commonAction(no_target: boolean) {
  showActions.value = false;
  isActing.value = true;
  target.value = -1;
  noTarget.value = no_target;
}
