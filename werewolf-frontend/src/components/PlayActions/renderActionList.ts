import { ComponentOptions, ComputedRef, h, vShow, withDirectives } from "vue";

import { Character, GameStatus } from "../../../shared/GameDefs";
import { gameStatus, self } from "../../reactivity/game";
import { potion } from "../../reactivity/playAction";
import ActionBtn from "./ActionBtn.vue";

const actionInfoList: {
  content: string;
  isShown: () => boolean;
  disabled: () => boolean;
  noTarget?: boolean;
  onClick?: Function;
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
    content: "参与警长竞选",
    isShown: () => true,
    disabled: () => gameStatus.value !== GameStatus.SHERIFF_ELECT,
    noTarget: true,
  },
  {
    content: "狼人杀人",
    isShown: () => self.value.character === "WEREWOLF",
    disabled: () => gameStatus.value !== GameStatus.WOLF_KILL,
  },
  {
    content: "查验身份",
    isShown: () => self.value.character === "SEER",
    disabled: () => gameStatus.value !== GameStatus.SEER_CHECK,
  },
  {
    content: "使用毒药",
    isShown: () => self.value.character === "WITCH",
    disabled: () => gameStatus.value !== GameStatus.WITCH_ACT,
    onClick: () => (potion.value = "POISON"),
  },
  {
    content: "使用灵药",
    isShown: () => self.value.character === "WITCH",
    disabled: () => gameStatus.value !== GameStatus.WITCH_ACT,
    onClick: () => (potion.value = "MEDICINE"),
  },
  {
    content: "保护一名玩家",
    isShown: () => self.value.character === "GUARD",
    disabled: () => gameStatus.value !== GameStatus.GUARD_PROTECT,
  },
  {
    content: "查看开枪状态",
    isShown: () => self.value.character === "HUNTER",
    disabled: () => gameStatus.value !== GameStatus.HUNTER_CHECK,
  },
  {
    content: "传递警徽",
    isShown: () => self.value.isSheriff,
    disabled: () => gameStatus.value !== GameStatus.SHERIFF_ASSIGN,
  },
  {
    content: "结束发言",
    isShown: () => true,
    disabled: () => gameStatus.value !== GameStatus.DAY_DISCUSS,
    noTarget: true,
  },
];

export const renderActionList = () =>
  actionInfoList.map((obj) => {
    if (!obj.isShown()) return null;

    return h(ActionBtn, {
      disabled: obj.disabled(),
      content: obj.content,
      noTarget: obj.noTarget,
      onClick: obj.onClick,
    });
  });
