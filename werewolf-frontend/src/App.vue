<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld message="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";

  import { defineComponent } from "vue";

  const Component = defineComponent({
    name: "App",
    components: {
      HelloWorld,
    },
    // 已启用类型推断
  });

  export default Component;
</script>
