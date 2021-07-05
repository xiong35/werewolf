<template>
  <Btn
    :disabled="disabled"
    :onClick="
      () => (disabled ? null : (commonAction(), onClick()))
    "
  ></Btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Btn from "../../components/Btn.vue";
  import { commonAction } from "./commonAction";

  const ActionBtn = defineComponent({
    name: "ActionBtn",
    components: { Btn },
    props: {
      onClick: { type: Function, default: () => {} },
      disabled: { type: Boolean, default: false },
    },
    setup(props) {
      return { commonAction };
    },
  });

  export default ActionBtn;
</script>

<style lang="scss" scoped></style>
