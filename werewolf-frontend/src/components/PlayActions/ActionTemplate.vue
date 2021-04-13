<template>
  <div class="action-template">
    <Btn
      :disabled="gameStatus !== GameStatus.SHERIFF_VOTE"
      content="票选警长"
    ></Btn>
    <Btn
      :disabled="gameStatus !== GameStatus.SHERIFF_ASSIGN"
      content="传递警徽"
    ></Btn>
    <Btn
      :disabled="gameStatus !== GameStatus.EXILE_VOTE"
      content="票选狼人"
    ></Btn>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const ActionTemplate = defineComponent({
    name: "ActionTemplate",
    components: { Btn },
    setup(props) {
      GameStatus.SHERIFF_VOTE;
      return {
        gameStatus,
        GameStatus,
      };
    },
  });

  export default ActionTemplate;
</script>


<style lang="scss" >
  .action-template {
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      margin: 0.5rem;
    }
  }
</style>