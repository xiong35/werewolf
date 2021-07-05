<template>
  <Btn
    class="exile-vote"
    content="票选狼人"
    :disabled="gameStatus !== GameStatus.EXILE_VOTE"
  ></Btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
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
