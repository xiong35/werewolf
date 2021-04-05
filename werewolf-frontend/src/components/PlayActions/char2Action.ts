import { ComponentOptions } from "vue";
import { Character } from "../../../shared/GameDefs";

import GuardAction from "./GuardAction.vue";
import SeerAction from "./SeerAction.vue";
import WitchAction from "./WitchAction.vue";
import HunterAction from "./HunterAction.vue";
import WerewolfAction from "./WerewolfAction.vue";

export const char2Action: Record<
  Character,
  ComponentOptions | null
> = {
  "": null,
  SHERIFF: null,
  VILLAGER: null,
  HOST: null,
  GUARD: GuardAction,
  HUNTER: HunterAction,
  SEER: SeerAction,
  WEREWOLF: WerewolfAction,
  WITCH: WitchAction,
};
