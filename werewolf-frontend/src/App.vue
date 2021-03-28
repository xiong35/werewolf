<template>
  <div class="main" :class="{ dark: theme === DARK }">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { RouterView } from "vue-router";
  import { theme, DARK } from "./global/theme";

  const Component = defineComponent({
    name: "App",
    components: {
      RouterView,
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