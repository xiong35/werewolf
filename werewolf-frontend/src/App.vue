<template>
  <div class="main" :class="{ dark: theme === DARK }">
    <router-view></router-view>
    <Dialog></Dialog>
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
  .main {
    max-width: 500px;
    margin: auto;
  }
</style>