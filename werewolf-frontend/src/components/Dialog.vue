<template>
  <UseMenu
    v-show="dialogTimeLeft > 0"
    :onCancel="() => (dialogTimeLeft = 0)"
  >
    <div class="dialog-content">
      <span class="content">{{ content }}</span>
      <div @click="dialogTimeLeft = 0" class="confirm">
        确认({{ dialogTimeLeft }}s)
      </div>
    </div>
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { content, dialogTimeLeft } from "../reactivity/dialog";

  import UseMenu from "./UseMenu.vue";

  const Dialog = defineComponent({
    name: "Dialog",
    components: { UseMenu },
    setup(props) {
      return { dialogTimeLeft, content };
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
