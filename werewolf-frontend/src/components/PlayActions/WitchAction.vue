<template>
  <div class="witch-action">
    <ActionTemplate>
      <Btn content="使用灵药"></Btn>
      <Btn content="使用毒药"></Btn>
    </ActionTemplate>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../Btn.vue";
  import ActionTemplate from "./ActionTemplate.vue";

  const WitchAction = defineComponent({
    name: "WitchAction",
    components: {
      Btn,
      ActionTemplate,
    },
    setup(props) {
      return {};
    },
  });

  export default WitchAction;
</script>


<style lang="scss" scoped>
  .witch-action {
  }
</style>