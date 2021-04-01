import { ref, Ref, computed, reactive } from "vue";

import {
  PublicPlayerDef,
  CharacterStatus,
} from "../../shared/ModelDefs";
import { Character } from "../../shared/GameDefs";

export const players: Ref<PublicPlayerDef[]> = ref([
  { index: 1, name: "tada", isAlive: true, isSheriff: false },
  { index: 2, name: "@#$%^&", isAlive: false, isSheriff: false },
  { index: 3, name: "afevqqw", isAlive: true, isSheriff: true },
]);
export const needingCharacters = ref<Character[]>([
  "GUARD",
  "HUNTER",
  "WEREWOLF",
]);

export const characterStatus = reactive<CharacterStatus>({
  protects: [],
});
export const character = ref<Character>("GUARD");

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
