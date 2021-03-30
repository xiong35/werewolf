<template>
  <div
    class="dialog-container"
    :style="{
      display: timeLeft <= 0 ? 'none' : 'block',
    }"
    @click="timeLeft = 0"
  >
    <UseBorder>
      <div class="dialog-content">
        <span class="content">{{ content }}</span>
        <div class="confirm">确认({{ timeLeft }}s)</div>
      </div>
    </UseBorder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  import { content, timeLeft } from "../reactivity/dialog";

  import UseBorder from "./UseBorder.vue";

  const Dialog = defineComponent({
    name: "Dialog",
    components: { UseBorder },
    setup(props) {
      return { timeLeft, content };
    },
  });

  export default Dialog;
</script>


<style lang="scss" scoped>
  .dialog-container {
    position: fixed;
    inset: 0;
    .useborder {
      position: absolute;
      margin: auto;
      max-width: 80%;
      box-sizing: border-box;
      padding: 2rem 2rem 1rem;
      inset: -3rem 0 0;
      width: 20rem;
      height: min-content;
      .dialog-content {
        height: 8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .content {
          font-size: 1.2rem;
        }
        .confirm {
          padding: 1rem;
        }
      }
    }
  }
</style>