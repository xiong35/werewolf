<template>
  <UseMenu v-show="timeLeft > 0" :onCancel="() => (timeLeft = 0)">
    <div class="dialog-content">
      <span class="content">{{ content }}</span>
      <div @click="timeLeft = 0" class="confirm">确认({{ timeLeft }}s)</div>
    </div>
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { content, timeLeft } from "../reactivity/dialog";

  import UseMenu from "./UseMenu.vue";

  const Dialog = defineComponent({
    name: "Dialog",
    components: { UseMenu },
    setup(props) {
      return { timeLeft, content };
    },
  });

  export default Dialog;
</script>


<style lang="scss" scoped>
  .dialog-content {
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
</style>