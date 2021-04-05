<template>
  <div class="werewolf-action">
    <ActionTemplate>
      <Btn content="选择杀害对象"></Btn>
    </ActionTemplate>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../Btn.vue";
  import ActionTemplate from "./ActionTemplate.vue";

  const WerewolfAction = defineComponent({
    name: "WerewolfAction",
    components: {
      Btn,
      ActionTemplate,
    },
    setup(props) {
      return {};
    },
  });

  export default WerewolfAction;
</script>


<style lang="scss" scoped>
  .werewolf-action {
  }
</style>