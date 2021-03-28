<template>
  <div class="btn">
    <span>{{ content }}</span>
    <div class="btn-mask"></div>
  </div>
</template>

<script lang="ts">
  //  TODO  水波纹效果?
  import { defineComponent } from "vue";

  const Btn = defineComponent({
    name: "Btn",
    props: {
      content: String,
    },
  });

  export default Btn;
</script>


<style lang="scss" scoped>
  $border-width: 2px;
  .btn {
    cursor: pointer;
    display: inline-block;
    border: $border-width solid;
    border-radius: 5px;
    line-height: 2.5;
    width: 6rem;
    text-align: center;
    position: relative;

    .btn-mask {
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