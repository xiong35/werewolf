<template>
  <div class="seer-action">
    <ActionTemplate>
      <Btn content="查看角色身份"></Btn>
    </ActionTemplate>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../Btn.vue";
  import ActionTemplate from "./ActionTemplate.vue";

  const SeerAction = defineComponent({
    name: "SeerAction",
    components: {
      Btn,
      ActionTemplate,
    },
    setup(props) {
      return {};
    },
  });

  export default SeerAction;
</script>


<style lang="scss" scoped>
  .seer-action {
  }
</style>