<template>
  <span class="useborder">
    <slot></slot>
    <div class="useborder-mask"></div>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  const UseBorder = defineComponent({
    name: "UseBorder",
    components: {},
    setup(props) {},
  });

  export default UseBorder;
</script>


<style lang="scss" scoped>
  $border-width: 3px;

  .useborder {
    border: $border-width solid;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    .useborder-mask {
      position: absolute;
      right: 6%;
      top: -2 * $border-width;
      height: 3 * $border-width;
      width: 8px;
      background-color: var(--bg);
      &::before,
      &::after {
        content: "";
        width: $border-width;
        height: $border-width;
        background-color: currentColor;
        position: absolute;
        border-radius: 50%;
        top: $border-width;
      }
      &::before {
        left: -$border-width / 2;
      }
      &::after {
        right: -$border-width / 2;
      }
    }
  }
</style>