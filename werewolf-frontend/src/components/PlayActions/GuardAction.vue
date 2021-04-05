<template>
  <div class="guardaction">
    <Btn content="选择守护对象"></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../../components/Btn.vue";

  const GuardAction = defineComponent({
    name: "GuardAction",
    components: { Btn },
    setup(props) {
      return {};
    },
  });

  export default GuardAction;
</script>


<style lang="scss" scoped>
  .guardaction {
  }
</style>