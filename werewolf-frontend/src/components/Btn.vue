<template>
  <div
    class="btn"
    :class="{ disabled }"
    @click="(e) => (disabled ? null : onClick(e))"
  >
    <UseBorder>
      <span class="content">{{ content }}</span>
    </UseBorder>
  </div>
</template>

<script lang="ts">
  //  TODO  水波纹效果?
  import { ComputedRef, defineComponent } from "vue";

  import UseBorder from "./UseBorder.vue";

  const Btn = defineComponent({
    name: "Btn",
    components: { UseBorder },
    props: {
      content: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      onClick: { type: Function, default: () => {} },
    },
  });

  export default Btn;
</script>

<style lang="scss" scoped>
  .btn {
    cursor: pointer;
    display: inline-block;
    .content {
      padding: 0.5rem;
      display: inline-block;
    }
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
