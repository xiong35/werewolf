<template>
  <div class="seer-action">
    <ActionTemplate>
      <Btn
        :disabled="gameStatus !== GameStatus.SEER_CHECK"
        content="查看角色身份"
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

  const SeerAction = defineComponent({
    name: "SeerAction",
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

  export default SeerAction;
</script>


<style lang="scss" scoped>
  .seer-action {
  }
</style>