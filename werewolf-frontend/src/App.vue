<template>
  <p>
    <router-link to="/">Go to Home</router-link>
    <br />
    <router-link to="/about">Go to About</router-link>
  </p>
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { RouterLink, RouterView } from "vue-router";

  const Component = defineComponent({
    name: "App",
    components: {
      RouterLink,
      RouterView,
    },
  });

  export default Component;
</script>
