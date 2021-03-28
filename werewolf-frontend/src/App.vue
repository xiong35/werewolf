<template>
  <div class="main light">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { RouterView } from "vue-router";

  const Component = defineComponent({
    name: "App",
    components: {
      RouterView,
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