import { ref, Ref, computed } from "vue";

import { PublicPlayerDef } from "../../shared/ModelDefs";
import { Character } from "../../shared/GameDefs";

export const players: Ref<PublicPlayerDef[]> = ref([]);
export const needingCharacters = ref<Character[]>([]);

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
