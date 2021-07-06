import { ComponentOptions, ComputedRef, h, vShow, withDirectives } from "vue";

import { Character, GameStatus } from "../../../shared/GameDefs";
import { gameStatus, self } from "../../reactivity/game";
import ActionBtn from "./ActionBtn.vue";
import ExileVote from "./ExileVote.vue";
import GuardAction from "./GuardAction.vue";
import HunterAction from "./HunterAction.vue";
import SeerAction from "./SeerAction.vue";
import SheriffAssign from "./SheriffAssign.vue";
import SheriffVote from "./SheriffVote.vue";
import WerewolfAction from "./WerewolfAction.vue";
import WitchAction from "./WitchAction.vue";

// export const actionList: ComponentOptions[] = [
//   ExileVote,
//   SheriffVote,
//   SheriffAssign,
//   GuardAction,
//   HunterAction,
//   SeerAction,
//   WerewolfAction,
//   WitchAction,
// ];

const actionInfoList: {
  content: string;
  isShown: () => boolean;
  disabled: () => boolean;
}[] = [
  {
    content: "票选狼人",
    isShown: () => true,
    disabled: () => gameStatus.value !== GameStatus.EXILE_VOTE,
  },
  {
    content: "票选警长",
    isShown: () => true,
    disabled: () => gameStatus.value !== GameStatus.SHERIFF_VOTE,
  },
  {
    content: "狼人杀人",
    isShown: () => self.value.character !== "WEREWOLF",
    disabled: () => gameStatus.value !== GameStatus.WOLF_KILL,
  },
];

export const renderActionList = () =>
  actionInfoList.map((obj) => {
    if (!obj.isShown()) return null;

    return h(ActionBtn, {
      disabled: obj.disabled(),
      content: obj.content,
    });
  });
