<template>
  <div class="use-menu" v-show="show">
    <UseBorder>
      <slot></slot>
    </UseBorder>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import UseBorder from "./UseBorder.vue";

  const UseMenu = defineComponent({
    name: "UseMenu",
    components: {
      UseBorder,
    },
    props: {
      show: { type: Boolean, default: false },
    },
    setup(props) {},
  });

  export default UseMenu;
</script>


<style lang="scss" scoped>
  .use-menu {
    position: fixed;
    inset: 0;
    .useborder {
      position: absolute;
      top: 43%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: 1rem;
      width: 80%;
      max-width: 20rem;
    }
  }
</style>