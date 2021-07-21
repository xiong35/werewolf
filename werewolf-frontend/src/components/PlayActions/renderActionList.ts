import {
  ComponentOptions,
  ComputedRef,
  h,
  vShow,
  withDirectives,
} from "vue";

import { Character, GameStatus } from "../../../shared/GameDefs";
import { gameStatus, players, self } from "../../reactivity/game";
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
    content: "传递警徽",
    isShown: () => self.value.isSheriff,
    disabled: () => gameStatus.value !== GameStatus.SHERIFF_ASSIGN,
  },
  {
    content: "结束发言",
    isShown: () => true,
    disabled: () => {
      if (gameStatus.value === GameStatus.DAY_DISCUSS)
        return false;
      if (
        gameStatus.value === GameStatus.SHERIFF_SPEECH &&
        self.value.canBeVoted
      )
        return false;

      if (gameStatus.value === GameStatus.LEAVE_MSG) {
        const dyingPlayer = players.value.find((p) => p.isDying);
        if (dyingPlayer && dyingPlayer.index === self.value.index)
          return false;
      }

      return true;
    },
    noTarget: true,
  },
];

export const renderActionList = () =>
  actionInfoList.map((obj) => {
    if (!obj.isShown()) return null;

    if (obj.content === "传递警徽") {
      return h(ActionBtn, {
        disabled: obj.disabled(),
        content: obj.content,
        noTarget: obj.noTarget,
        onClick: obj.onClick,
      });
    }

    return h(ActionBtn, {
      disabled: obj.disabled() && !self.value.isAlive,
      content: obj.content,
      noTarget: obj.noTarget,
      onClick: obj.onClick,
    });
  });
