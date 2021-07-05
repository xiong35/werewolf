<template>
  <Btn
    class="sheriff-assign"
    :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
    content="传递警徽"
  ></Btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const SheriffAssign = defineComponent({
    name: "SheriffAssign",
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

  export default SheriffAssign;
</script>

<style lang="scss" scoped>
  .sheriff-assign {
  }
</style>
