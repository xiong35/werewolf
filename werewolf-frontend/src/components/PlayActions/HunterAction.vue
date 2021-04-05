<template>
  <div class="hunter-action">
    <ActionTemplate>
      <Btn content="查看开枪状态"></Btn>
    </ActionTemplate>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../Btn.vue";
  import ActionTemplate from "./ActionTemplate.vue";

  const HunterAction = defineComponent({
    name: "HunterAction",
    components: {
      Btn,
      ActionTemplate,
    },
    setup(props) {
      return {};
    },
  });

  export default HunterAction;
</script>


<style lang="scss" scoped>
  .hunter-action {
  }
</style>