<template>
  <Btn
    v-if="isShown"
    class="werewolf-action"
    :disabled="gameStatus !== GameStatus.WOLF_KILL"
    content="选择杀害对象"
  ></Btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  import Btn from "./ActionBtn.vue";

  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus, self } from "../../reactivity/game";

  const WerewolfAction = defineComponent({
    name: "WerewolfAction",
    components: {
      Btn,
    },
    setup(props) {
      const isShown = computed(
        () => self.value.character === "WEREWOLF"
      );

      return {
        GameStatus,
        gameStatus,
        isShown,
      };
    },
  });

  export default WerewolfAction;
</script>

<style lang="scss" scoped>
  .werewolf-action {
  }
</style>
