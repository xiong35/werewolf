<template>
  <Btn
    v-if="isShown"
    class="hunter-action"
    :disabled="gameStatus !== GameStatus.HUNTER_CHECK"
    content="查看开枪状态"
  ></Btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  import Btn from "./ActionBtn.vue";

  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus, self } from "../../reactivity/game";

  const HunterAction = defineComponent({
    name: "HunterAction",
    components: {
      Btn,
    },
    setup(props) {
      const isShown = computed(
        () => self.value.character === "HUNTER"
      );

      return {
        GameStatus,
        gameStatus,
        isShown,
      };
    },
  });

  export default HunterAction;
</script>

<style lang="scss" scoped>
  .hunter-action {
  }
</style>
