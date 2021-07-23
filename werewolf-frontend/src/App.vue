<template>
  <div class="wrapper" :class="{ dark: theme === DARK }">
    <div class="main">
      <router-view></router-view>
      <Dialog></Dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { RouterView } from "vue-router";

  import { theme, DARK } from "./reactivity/theme";
  import Dialog from "./components/Dialog.vue";

  const Component = defineComponent({
    name: "App",
    components: {
      RouterView,
      Dialog,
    },
    setup(props) {
      return { theme, DARK };
    },
  });

  export default Component;
</script>

<style lang="scss" scoped>
  .wrapper {
    .main {
      max-width: 30rem;
      margin: auto;
      min-height: 100vh;
      padding-bottom: 30px;
      box-sizing: border-box;
    }
  }
</style>
