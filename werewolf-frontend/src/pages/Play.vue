<template>
  <div class="play">
    <PlayerList></PlayerList>
    <div class="actions">
      <Btn content="查看角色"></Btn>
      <Btn content="显示操作"></Btn>
      <Btn @click="showMemo = true" content="备忘速记"></Btn>
      <Memo></Memo>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import PlayerList from "../components/RoomPlayerList.vue";
  import Btn from "../components/Btn.vue";
  import Memo from "../components/Memo.vue";

  // TODO implement play

  import { characterStatus, character } from "../reactivity/game";
  import { showMemo, showActions, showCharacter } from "../reactivity/playPage";

  const Play = defineComponent({
    name: "Play",
    components: {
      Btn,
      PlayerList,
      Memo,
    },
    setup(props) {
      return {
        characterStatus,
        character,
        showMemo,
        showActions,
        showCharacter,
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