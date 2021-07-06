import { ref } from "vue";

import { Potion } from "../../shared/GameDefs";
import { index } from "../../shared/ModelDefs";
import { characterAct } from "../http/action";
import { showDialog } from "./dialog";

export async function act() {
  const res = (await characterAct({
    target: target.value,
  })) as any; // TODO any?
  // TODO deal with res

  /* hide dialog */
  isActing.value = false;

  if (res && res.status === 200) {
    showDialog("操作成功!");
    /* reset */
    potion.value = undefined;
    target.value = 0;
    noTarget.value = false;
  }
}

export const isActing = ref(false);
export const noTarget = ref(false);
export const target = ref<index>(0);
export const potion = ref<Potion>();

export function setTarget(index: index) {
  if (!isActing.value) return;

  target.value = index;
}
