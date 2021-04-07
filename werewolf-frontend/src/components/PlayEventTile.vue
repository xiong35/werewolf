<template>
  <div class="play-event-tile" :class="'.level' + level">
    <div class="left-info">
      <Avatar :character="character"></Avatar>
      <img
        :src="`/src/assets/${at % 2 === 1 ? 'sun' : 'moon'}${theme}.svg`"
        class="isDay"
      />
    </div>
    <span class="deed"> {{ deed }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { theme } from "../reactivity/theme";

  import Avatar from "./Avatar.vue";

  const PlayEventTile = defineComponent({
    name: "PlayEventTile",
    components: { Avatar },
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
      .avatar {
        width: 100%;
        background-color: transparent;
      }
    }
    .deed {
      flex: 1 0 0;
      text-align: left;
    }
  }
</style>