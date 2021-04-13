<template>
  <div class="witch-action">
    <ActionTemplate>
      <Btn
        :disabled="gameStatus !== GameStatus.WITCH_ACT"
        content="使用灵药"
      ></Btn>
      <!-- TODO 用过药就不能在用 -->
      <Btn
        :disabled="gameStatus !== GameStatus.WITCH_ACT"
        content="使用毒药"
      ></Btn>
    </ActionTemplate>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "./ActionBtn.vue";
  import ActionTemplate from "./ActionTemplate.vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  const WitchAction = defineComponent({
    name: "WitchAction",
    components: {
      Btn,
      ActionTemplate,
    },
    setup(props) {
      return {
        GameStatus,
        gameStatus,
      };
    },
  });

  export default WitchAction;
</script>


<style lang="scss" scoped>
  .witch-action {
  }
</style>