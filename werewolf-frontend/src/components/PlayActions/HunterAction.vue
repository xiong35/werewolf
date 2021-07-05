<template>
  <Btn
    class="hunter-action"
    :disabled="gameStatus !== GameStatus.HUNTER_CHECK"
    content="查看开枪状态"
  ></Btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "./ActionBtn.vue";

  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  const HunterAction = defineComponent({
    name: "HunterAction",
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

  export default HunterAction;
</script>

<style lang="scss" scoped>
  .hunter-action {
  }
</style>
