import { ComponentOptions } from "vue";

import { Character } from "../../../shared/GameDefs";
import GuardAction from "./GuardAction.vue";
import HunterAction from "./HunterAction.vue";
import SeerAction from "./SeerAction.vue";
import WerewolfAction from "./WerewolfAction.vue";
import WitchAction from "./WitchAction.vue";

export const char2Action: Record<
  Character,
  ComponentOptions | null
> = {
  "": null,
  SHERIFF: null, // TODO 警长也需要
  VILLAGER: null,
  GUARD: GuardAction,
  HUNTER: HunterAction,
  SEER: SeerAction,
  WEREWOLF: WerewolfAction,
  WITCH: WitchAction,
};
