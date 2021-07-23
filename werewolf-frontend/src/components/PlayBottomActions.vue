<template>
  <div class="play-bottom-actions" v-show="isActing">
    <img
      @click="isActing = false"
      :src="`/src/assets/close${theme}.svg`"
      alt="close"
    />
    <div>
      <div>
        <span>{{ noTarget ? "是否确认" : "选择目标" }}</span>
      </div>
      <div>
        <small :style="{ opacity: 0.6 }">不选即为放弃</small>
      </div>
    </div>
    <img
      @click="act"
      :src="`/src/assets/checked${theme}.svg`"
      alt="checked"
    />
  </div>
  <div class="play-bottom-action-holder"></div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import {
    isActing,
    act,
    noTarget,
  } from "../reactivity/playAction";
  import { theme } from "../reactivity/theme";

  const PlayBottomActions = defineComponent({
    name: "PlayBottomActions",
    components: {},
    setup(props) {
      return {
        isActing,
        theme,
        noTarget,
        act,
      };
    },
  });

  export default PlayBottomActions;
</script>

<style lang="scss" scoped>
  $height: 3rem;
  .play-bottom-action-holder {
    height: $height;
  }
  .play-bottom-actions {
    position: fixed;
    background-color: var(--bg);
    right: 0;
    left: 0;
    bottom: 0;
    height: $height;
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
