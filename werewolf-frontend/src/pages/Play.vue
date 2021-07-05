<template>
  <div class="play">
    <PlayerList :playerList="players"></PlayerList>

    <div class="date">
      Day {{ Math.ceil(date / 2) }}
      <img
        class="date-icon"
        :src="`/src/assets/${
          date % 2 === 0 ? 'moon' : 'sun'
        }${theme}.svg`"
      />
    </div>

    <div class="game-status">{{ gameStatus }}</div>

    <div class="actions">
      <Btn
        :disabled="isActing"
        @click="showCharacter = true"
        content="查看角色"
      ></Btn>
      <Btn
        :disabled="isActing"
        @click="showActions = true"
        :class="{ active: canAct }"
        content="显示操作"
      ></Btn>
      <Btn
        :disabled="isActing"
        @click="showMemo = true"
        content="备忘速记"
      ></Btn>
      <Btn
        :disabled="isActing"
        @click="showEvents = true"
        content="事件记录"
      ></Btn>

      <Character></Character>
      <Actions></Actions>
      <Memo></Memo>
      <Events></Events>
    </div>

    <BottomActions></BottomActions>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onActivated, onMounted } from "vue";

  import PlayerList from "../components/RoomPlayerList.vue";
  import Btn from "../components/Btn.vue";
  import Events from "../components/PlayEvents.vue";
  import Memo from "../components/PlayMemo.vue";
  import Character from "../components/PlayCharacter.vue";
  import Actions from "../components/PlayActions/index.vue";
  import BottomActions from "../components/PlayBottomActions.vue";

  import {
    self,
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
    canAct,
  } from "../reactivity/playPage";
  import { theme } from "../reactivity/theme";
  import { isActing } from "../reactivity/playAction";

  const Play = defineComponent({
    name: "Play",
    components: {
      Btn,
      PlayerList,
      Memo,
      Character,
      Actions,
      Events,
      BottomActions,
    },
    setup(props) {
      onMounted(refresh);
      onActivated(refresh);

      return {
        players,

        self,
        character,

        showMemo,
        showActions,
        canAct,
        showCharacter,
        showEvents,
        isActing,

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

<style lang="scss">
  .play {
    @keyframes blink {
      from {
        background-color: var(--bg);
      }
      to {
        background-color: var(--on-bg);
      }
    }
    .btn {
      position: relative;
      &.active::after {
        opacity: 1;
      }
      &::after {
        transition: all 0.2s;
        opacity: 0;
        $size: 0.6rem;
        content: "";
        position: absolute;
        right: -0.3 * $size;
        top: -0.3 * $size;
        width: $size;
        height: $size;
        background-color: var(--on-bg);
        border: 2px solid var(--bg);
        border-radius: 50%;
        animation: blink 1s linear infinite alternate;
      }
    }
  }
</style>
