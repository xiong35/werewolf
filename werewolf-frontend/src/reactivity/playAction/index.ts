import { ref } from "vue";
import { index } from "../../../shared/ModelDefs";

export const isActing = ref(false);
export const target = ref<index>(-1);

export function setTarget(index: index) {
  if (!isActing.value) return;

  target.value = index;
}
