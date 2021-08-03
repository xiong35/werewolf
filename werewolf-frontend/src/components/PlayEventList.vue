<template>
  <div v-if="events !== undefined" class="event-day">
    Day {{ day }}
  </div>
  <Tile
    v-for="item in events"
    :key="item.at + item.deed"
    :character="item.character"
    :deed="item.deed"
    :at="item.at"
  ></Tile>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import type { GameEvent } from "../../shared/ModelDefs";

  import Tile from "../components/PlayEventTile.vue";

  const PlayEventList = defineComponent({
    name: "PlayEventList",
    components: { Tile },
    props: {
      events: Object as () => GameEvent[], // GameEvent 的数组
      day: Number,
    },
    setup(props) {
      return {};
    },
  });

  export default PlayEventList;
</script>

<style lang="scss" scoped>
  .event-day {
    text-align: left;
    padding: 0.4rem 0.2rem 0.3rem;
    font-weight: bold;
    font-size: 1.1rem;
  }
</style>
