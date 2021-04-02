<template>
  <div class="use-menu" v-show="show">
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
      show: { type: Boolean, default: false },
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
      top: 43%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: 1rem;
      width: 80%;
      max-width: 20rem;
      .cancel {
        $size: 1rem;
        position: absolute;
        top: 0;
        right: 0;
        width: $size;
        height: $size;
        padding: $size;
        cursor: pointer;
      }
    }
  }
</style>