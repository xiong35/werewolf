import { ComponentOptions } from "vue";

import { Character } from "../../../shared/GameDefs";
import ExileVote from "./ExileVote.vue";
import GuardAction from "./GuardAction.vue";
import HunterAction from "./HunterAction.vue";
import SeerAction from "./SeerAction.vue";
import SheriffAssign from "./SheriffAssign.vue";
import SheriffVote from "./SheriffVote.vue";
import WerewolfAction from "./WerewolfAction.vue";
import WitchAction from "./WitchAction.vue";

export const actionList: ComponentOptions[] = [
  ExileVote,
  GuardAction,
  HunterAction,
  SeerAction,
  SheriffAssign,
  SheriffVote,
  WerewolfAction,
  WitchAction,
];
