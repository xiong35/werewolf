import { isActing, target } from "../../reactivity/playAction";
import { showActions } from "../../reactivity/playPage";

export function commonAction() {
  showActions.value = false;
  isActing.value = true;
  target.value = -1;
}
