<template>
  <div class="use-menu">
    <UseBorder>
      <slot></slot>
      <img
        @click="onCancel"
        class="cancel"
        :src="`/src/assets/close${theme}.svg`"
      />
    </UseBorder>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { theme } from "../reactivity/theme";

  import UseBorder from "./UseBorder.vue";

  const UseMenu = defineComponent({
    name: "UseMenu",
    components: {
      UseBorder,
    },
    props: {
      onCancel: { type: Function, required: true },
    },
    setup(props) {
      return { theme };
    },
  });

  export default UseMenu;
</script>


<style lang="scss" scoped>
  .use-menu {
    position: fixed;
    inset: 0;
    .use-border {
      position: absolute;
      top: 46%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: 1rem;
      width: 80%;
      max-width: 20rem;
      .cancel {
        $size: 1.5rem;
        position: absolute;
        top: -$size * 0.5;
        right: -$size * 0.5;
        width: $size;
        height: $size;
        padding: $size;
        cursor: pointer;
        background-color: transparent;
      }
    }
  }
</style>