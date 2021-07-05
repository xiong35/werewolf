<template>
  <Btn
    v-if="isShown"
    class="guard-action"
    :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
    content="选择守护对象"
  ></Btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus, self } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const GuardAction = defineComponent({
    name: "GuardAction",
    components: {
      Btn,
    },
    setup(props) {
      const isShown = computed(
        () => self.value.character === "GUARD"
      );

      return {
        GameStatus,
        gameStatus,
        isShown,
      };
    },
  });

  export default GuardAction;
</script>

<style lang="scss" scoped>
  .guard-action {
  }
</style>
