<template>
  <UseMenu
    class="game-event"
    v-show="showEvents"
    :onCancel="() => (showEvents = false)"
  >
    <div class="title">事件一览</div>
    <div v-if="groupedGameEvents.length > 0">
      <EventList
        v-for="(events, day) in groupedGameEvents"
        :key="day"
        :day="day"
        :events="events"
      ></EventList>
    </div>
    <div class="placeholder" v-else>暂无事件</div>
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";

  import { showEvents } from "../reactivity/playPage";
  import { GameEvent } from "../../shared/ModelDefs";

  import UseMenu from "./UseMenu.vue";
  import EventList from "./PlayEventList.vue";
  import { groupedGameEvents } from "../reactivity/computeGameEvents";

  const Events = defineComponent({
    name: "Events",
    components: { UseMenu, EventList },
    props: {},
    setup(props) {
      return { showEvents, groupedGameEvents };
    },
  });

  export default Events;
</script>

<style lang="scss">
  .use-menu.game-event {
    text-align: center;
    .use-border {
      overflow-y: scroll;
      overflow-x: hidden;
      max-height: 80vh;
    }

    .title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    textarea {
      resize: none;
      width: 85%;
      margin: 1rem;
    }
    .placeholder {
      text-align: center;
      opacity: 0.5;
      padding: 2rem 0;
    }
  }
</style>
