<template>
  <Btn
    v-if="isShown"
    class="seer-action"
    :disabled="gameStatus !== GameStatus.SEER_CHECK"
    content="查看角色身份"
  ></Btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  import Btn from "./ActionBtn.vue";

  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus, self } from "../../reactivity/game";

  const SeerAction = defineComponent({
    name: "SeerAction",
    components: {
      Btn,
    },
    setup(props) {
      const isShown = computed(
        () => self.value.character === "SEER"
      );

      return {
        GameStatus,
        gameStatus,
        isShown,
      };
    },
  });

  export default SeerAction;
</script>

<style lang="scss" scoped>
  .seer-action {
  }
</style>
