<template>
  <div class="play-bottom-actions" v-show="isActing">
    <img
      @click="isActing = false"
      :src="`/src/assets/close${theme}.svg`"
      alt="close"
    />
    <span>选择目标</span>
    <img :src="`/src/assets/checked${theme}.svg`" alt="checked" />
    <!-- TODO!! bind submit method -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { isActing } from "../reactivity/playAction";
  import { theme } from "../reactivity/theme";

  const PlayBottomActions = defineComponent({
    name: "PlayBottomActions",
    components: {},
    setup(props) {
      return {
        isActing,
        theme,
      };
    },
  });

  export default PlayBottomActions;
</script>


<style lang="scss" scoped>
  .play-bottom-actions {
    position: fixed;
    background-color: transparent;
    right: 0;
    left: 0;
    bottom: 0;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2vh 10%;
    max-width: 30rem;
    margin: auto;
    img {
      background-color: transparent;
      padding: 0.5rem;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: 0.7;
    }
  }
</style>