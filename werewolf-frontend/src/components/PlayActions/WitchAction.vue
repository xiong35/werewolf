<template>
  <div v-if="isShown">
    <Btn
      class="witch-action"
      :disabled="gameStatus !== GameStatus.WITCH_ACT"
      content="使用灵药"
    ></Btn>
    <!-- TODO 用过药就不能在用 -->
    <Btn
      class="witch-action"
      :disabled="gameStatus !== GameStatus.WITCH_ACT"
      content="使用毒药"
    ></Btn>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  import Btn from "./ActionBtn.vue";

  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus, self } from "../../reactivity/game";

  const WitchAction = defineComponent({
    name: "WitchAction",
    components: {
      Btn,
    },
    setup(props) {
      const isShown = computed(
        () => self.value.character === "WITCH"
      );

      return {
        GameStatus,
        gameStatus,
        isShown,
      };
    },
  });

  export default WitchAction;
</script>

<style lang="scss" scoped>
  .witch-action {
  }
</style>
