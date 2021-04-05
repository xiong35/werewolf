<template>
  <div class="action-template">
    <Btn content="票选警长"></Btn>
    <Btn content="传递警徽"></Btn>
    <Btn content="票选狼人"></Btn>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../Btn.vue";

  const ActionTemplate = defineComponent({
    name: "ActionTemplate",
    components: { Btn },
    setup(props) {
      return {};
    },
  });

  export default ActionTemplate;
</script>


<style lang="scss" >
  .action-template {
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      margin: 0.5rem;
    }
  }
</style>