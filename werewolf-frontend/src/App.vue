<template>
  <router-view></router-view>
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
