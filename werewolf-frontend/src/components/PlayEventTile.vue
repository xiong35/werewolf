<template>
  <div class="play-event-tile" :class="'.level' + level">
    <div class="left-info">
      <img
        :src="`/src/assets/${at % 2 === 1 ? 'sun' : 'moon'}${theme}.svg`"
        class="isDay"
      />
      <img
        class="icon"
        :src="`/src/assets/${character.toLowerCase()}${theme}.svg`"
        :alt="character"
      />
    </div>
    <span class="deed"> {{ deed }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { theme } from "../reactivity/theme";

  const PlayEventTile = defineComponent({
    name: "PlayEventTile",
    components: {},
    props: {
      character: { type: String, isRequired: true },
      level: { type: Number, default: 1 },
      deed: String,
    },
    setup(props) {
      return { theme };
    },
  });

  export default PlayEventTile;
</script>


<style lang="scss" scoped>
  .play-event-tile {
    display: flex;
    align-items: center;
    margin: 0.4rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      background-color: currentColor;
      inset: -0.3rem 0 -0.3rem 1.12rem;
      border-radius: 999px;
      width: 2px;
    }
    .left-info {
      position: relative;
      padding: 0.3rem;
      border: 2px solid;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      .isDay {
        position: absolute;
        width: 30%;
        left: -10%;
        top: -10%;
        border-radius: 50%;
        border: 2px solid transparent;
        box-shadow: 0 0 0 1px currentColor;
      }
      .icon {
        width: 100%;
        background-color: transparent;
        z-index: 2;
      }
    }
    .deed {
      flex: 1 0 0;
      text-align: left;
    }
  }
</style>