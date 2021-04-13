<template>
  <div class="werewolf-action">
    <ActionTemplate>
      <Btn
        :disabled="gameStatus !== GameStatus.WOLF_KILL"
        content="选择杀害对象"
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

  const WerewolfAction = defineComponent({
    name: "WerewolfAction",
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

  export default WerewolfAction;
</script>


<style lang="scss" scoped>
  .werewolf-action {
  }
</style>