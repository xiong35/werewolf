import { ref } from "vue";
import { Potion } from "../../shared/GameDefs";
import { index } from "../../shared/ModelDefs";

export const isActing = ref(false);
export const target = ref<index>(-1);
export const potion = ref<Potion>();

export function setTarget(index: index) {
  if (!isActing.value) return;

  target.value = index;
}
