<template>
  <UseMenu v-show="showEvents" :onCancel="() => (showEvents = false)">
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { showEvents } from "../reactivity/playPage";
  import { refresh, gameEvents } from "../reactivity/game";

  import UseMenu from "./UseMenu.vue";

  const Events = defineComponent({
    name: "Events",
    components: { UseMenu },
    props: {},
    setup(props) {
      return { showEvents };
    },
  });

  export default Events;
</script>


<style lang="scss" scoped>
  .use-menu {
    text-align: center;

    .title {
      font-size: 1.3rem;
      font-weight: bold;
    }

    textarea {
      resize: none;
      width: 85%;
      margin: 1rem;
    }
  }
</style>