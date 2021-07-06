<template>
  <Btn
    :disabled="disabled"
    :onClick="() => (disabled ? null : commonAction(noTarget))"
  ></Btn>
</template>

<script lang="ts">
  import { ComputedRef, defineComponent } from "vue";

  import Btn from "../../components/Btn.vue";
  import { commonAction } from "./commonAction";

  const ActionBtn = defineComponent({
    name: "ActionBtn",
    components: { Btn },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      noTarget: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      return { commonAction };
    },
  });

  export default ActionBtn;
</script>

<style lang="scss" scoped></style>
