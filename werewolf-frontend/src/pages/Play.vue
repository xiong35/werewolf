<template>
  <div class="play">
    <PlayerList></PlayerList>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import PlayerList from "../components/RoomPlayerList.vue";
  import Btn from "../components/Btn.vue";

  // TODO implement play

  import { characterStatus, character } from "../reactivity/play";

  const Play = defineComponent({
    name: "Play",
    components: {
      Btn,
      PlayerList,
    },
    setup(props) {
      return { characterStatus, character };
    },
  });

  export default Play;
</script>


<style lang="scss" scoped>
  .play {
  }
</style> 