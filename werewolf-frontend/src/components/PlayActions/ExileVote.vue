<template>
  <Btn
    class="exile-vote"
    :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
    content="票选警长"
  ></Btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const ExileVote = defineComponent({
    name: "ExileVote",
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

  export default ExileVote;
</script>

<style lang="scss" scoped>
  .exile-vote {
  }
</style>
