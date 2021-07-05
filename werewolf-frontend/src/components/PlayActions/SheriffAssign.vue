<template>
  <Btn
    v-if="isShown"
    class="sheriff-assign"
    :disabled="gameStatus !== GameStatus.GUARD_PROTECT"
    content="传递警徽"
  ></Btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { GameStatus } from "../../../shared/GameDefs";
  import { gameStatus, self } from "../../reactivity/game";

  import Btn from "./ActionBtn.vue";

  const SheriffAssign = defineComponent({
    name: "SheriffAssign",
    components: {
      Btn,
    },
    setup(props) {
      const isShown = computed(() => self.value.isSheriff);

      return {
        GameStatus,
        gameStatus,
        isShown,
      };
    },
  });

  export default SheriffAssign;
</script>

<style lang="scss" scoped>
  .sheriff-assign {
  }
</style>
