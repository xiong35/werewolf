<template>
  <div class="guard-action">
    <ActionTemplate>
      <Btn
        :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
        content="选择守护对象"
      ></Btn>
    </ActionTemplate>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus } from "../../reactivity/game";

  import Btn from "../Btn.vue";
  import ActionTemplate from "./ActionTemplate.vue";

  const GuardAction = defineComponent({
    name: "GuardAction",
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

  export default GuardAction;
</script>


<style lang="scss" scoped>
  .guard-action {
  }
</style>