<template>
  <div class="play">
    <PlayerList :playerList="players"></PlayerList>
    <div class="date">
      Day {{ Math.ceil(date / 2) }}
      <img
        class="date-icon"
        :src="`/src/assets/${date % 2 === 0 ? 'moon' : 'sun'}${theme}.svg`"
      />
    </div>
    <div class="game-status">{{ gameStatus }}</div>
    <div class="actions">
      <Btn @click="showCharacter = true" content="查看角色"></Btn>
      <Btn @click="showActions = true" content="显示操作"></Btn>
      <Btn @click="showMemo = true" content="备忘速记"></Btn>
      <Btn @click="showEvents = true" content="事件记录"></Btn>

      <Actions></Actions>
      <Character></Character>
      <Memo></Memo>
      <Events></Events>
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
    gameStatus,
    date,
  } from "../reactivity/game";
  import {
    showMemo,
    showActions,
    showCharacter,
    showEvents,
  } from "../reactivity/playPage";
  import { theme } from "../reactivity/theme";

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

        gameStatus,
        date,
        theme,
      };
    },
  });

  export default Play;
</script>


<style lang="scss" scoped>
  .play {
    text-align: center;
    .actions {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .btn {
        margin: 0.5rem;
      }
    }
    .date,
    .game-status {
      font-weight: bold;
      font-size: 1.5rem;
      padding-bottom: 1.3rem;
    }
    .date {
      display: flex;
      align-items: center;
      justify-content: center;
      .date-icon {
        width: 2.6rem;
        margin: 0 1rem;
      }
    }
  }
</style> 