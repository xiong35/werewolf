<template>
  <div class="play-bottom-actions" v-show="isActing">
    <img
      @click="isActing = false"
      :src="`/src/assets/close${theme}.svg`"
      alt="close"
    />
    <div>
      <div>
        <span>选择目标</span>
      </div>
      <div>
        <small :style="{ opacity: 0.6 }">不选即为放弃</small>
      </div>
    </div>
    <img @click="act" :src="`/src/assets/checked${theme}.svg`" alt="checked" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { isActing, act } from "../reactivity/playAction";
  import { theme } from "../reactivity/theme";

  const PlayBottomActions = defineComponent({
    name: "PlayBottomActions",
    components: {},
    setup(props) {
      return {
        isActing,
        theme,
        act,
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