<template>
  <UseMenu
    class="game-event"
    v-show="showEvents"
    :onCancel="() => (showEvents = false)"
  >
    <div class="title">事件一览</div>
    <EventTile
      v-for="item in gameEvents"
      :key="item.at + item.deed"
      :character="item.character"
      :deed="item.deed"
      :at="item.at"
    ></EventTile>
    <EventTile at="1" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="2" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="4" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="8" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="9" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="10" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="3" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="1" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="1" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile at="1" character="HUNTER" deed="杀死了 1 号"></EventTile>
    <EventTile
      character="SEER"
      deed="杀死了杀死了杀死了杀死了杀死了杀死了杀死了杀死了杀死了 1 号"
    ></EventTile>
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { showEvents } from "../reactivity/playPage";
  import { refresh, gameEvents } from "../reactivity/game";

  import UseMenu from "./UseMenu.vue";
  import EventTile from "./PlayEventTile.vue";

  const Events = defineComponent({
    name: "Events",
    components: { UseMenu, EventTile },
    props: {},
    setup(props) {
      return { showEvents, gameEvents };
    },
  });

  export default Events;
</script>


<style lang="scss" >
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
  }
</style>