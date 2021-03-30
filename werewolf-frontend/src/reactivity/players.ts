import { ref, Ref, computed } from "vue";

import { PublicPlayerDef } from "../../shared/ModelDefs";
import { Character } from "../../shared/GameDefs";

export const players: Ref<PublicPlayerDef[]> = ref([
  {
    index: 1,
    name: "俺俩二v啊",
    isAlive: false,
    isSheriff: true,
  },
  {
    index: 2,
    name: "啊我日嘎哇",
    isAlive: true,
    isSheriff: false,
  },
  {
    index: 3,
    name: "ヾ(•ω•`)o",
    isAlive: true,
    isSheriff: false,
  },
]);

export const needingCharacters = ref<Character[]>([
  "HUNTER",
  "VILLAGER",
  "WEREWOLF",
  "WEREWOLF",
  "SEER",
]);

export const playerList = computed(() => {
  return new Array(needingCharacters.value.length)
    .fill(0)
    .map(
      (_, ind) =>
        players.value.find(
          (player) => player.index === ind + 1
        ) ?? { index: ind + 1 }
    );
});
