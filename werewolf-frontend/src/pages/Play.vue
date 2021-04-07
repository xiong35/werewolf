<template>
  <div class="play">
    <PlayerList :playerList="players"></PlayerList>
    <div class="actions">
      <Btn @click="showCharacter = true" content="查看角色"></Btn>
      <Btn @click="showActions = true" content="显示操作"></Btn>
      <Btn @click="showMemo = true" content="备忘速记"></Btn>
      <Btn @click="showEvents = true" content="事件记录"></Btn>

      <Actions></Actions>
      <Character></Character>
      <Memo></Memo>
      <Events></Events>

      <!-- TODO show current day -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from "vue";

  import PlayerList from "../components/RoomPlayerList.vue";
  import Btn from "../components/Btn.vue";
  import Events from "../components/PlayEvents.vue";
  import Memo from "../components/PlayMemo.vue";
  import Character from "../components/PlayCharacter.vue";
  import Actions from "../components/PlayActions/index.vue";

  import {
    characterStatus,
    character,
    refresh,
    players,
  } from "../reactivity/game";
  import {
    showMemo,
    showActions,
    showCharacter,
    showEvents,
  } from "../reactivity/playPage";

  const Play = defineComponent({
    name: "Play",
    components: {
      Btn,
      PlayerList,
      Memo,
      Character,
      Actions,
      Events,
    },
    setup(props) {
      onMounted(refresh);

      return {
        players,

        characterStatus,
        character,

        showMemo,
        showActions,
        showCharacter,
        showEvents,
      };
    },
  });

  export default Play;
</script>


<style lang="scss" scoped>
  .play {
    .actions {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .btn {
        margin: 0.5rem;
      }
    }
  }
</style> 