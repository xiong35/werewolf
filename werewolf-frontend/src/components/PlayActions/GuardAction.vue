<template>
  <Btn
    class="guard-action"
    :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
    content="选择守护对象"
  ></Btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const GuardAction = defineComponent({
    name: "GuardAction",
    components: {
      Btn,
    },
    setup(props) {
      return {
        GameStatus,
        gameStatus,
      };
    },
  });

  export default GuardAction;
</script>

<style lang="scss" scoped>
  .guard-action {
  }
</style>
