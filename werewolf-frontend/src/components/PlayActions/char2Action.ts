import { ComponentOptions } from "vue";
import { Character } from "../../../shared/GameDefs";

import GuardAction from "./GuardAction.vue";

export const char2Action: Record<Character, ComponentOptions> = {
  GUARD: GuardAction,
  HOST: GuardAction,
  HUNTER: GuardAction,
  SEER: GuardAction,
  SHERIFF: GuardAction,
  VILLAGER: GuardAction,
  WEREWOLF: GuardAction,
  WITCH: GuardAction,
  "": GuardAction,
};
