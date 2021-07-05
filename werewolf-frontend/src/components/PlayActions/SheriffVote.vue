<template>
  <Btn
    class="sheriff-vote"
    :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
    content="票选警长"
  ></Btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const SheriffVote = defineComponent({
    name: "SheriffVote",
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

  export default SheriffVote;
</script>

<style lang="scss" scoped>
  .sheriff-vote {
  }
</style>
