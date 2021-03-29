<template>
  <div class="createroom">
    <span class="title">角色</span>
    <div class="tile-wrapper">
      <RoomCharacterTile
        :key="name"
        v-for="(name, value) in characters"
        :character="value"
      ></RoomCharacterTile>
    </div>
    <div class="name">
      <span class="title">你的昵称：</span>
      <UseBorder>
        <input type="text" placeholder="请输入昵称" v-model="nickname" />
      </UseBorder>
    </div>
    <Btn content="确认创建"></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import RoomCharacterTile from "../components/RoomCharacterTile.vue";
  import Btn from "../components/Btn.vue";
  import UseBorder from "../components/UseBorder.vue";

  import { characters, nickname } from "../reactivity/room";

  // import { Character } from "../../../shared/GameDefs";

  const CreateRoom = defineComponent({
    name: "CreateRoom",
    components: { RoomCharacterTile, Btn, UseBorder },
    setup(props) {
      return { characters, nickname };
    },
  });

  export default CreateRoom;
</script>


<style lang="scss" scoped>
  .createroom {
    padding: 1rem 1rem 0;
    text-align: center;
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .tile-wrapper {
      display: flex;
      flex-wrap: wrap;
      .room-character-tile {
        flex: 1 1 33%;
        padding: 1rem 0;
      }
    }

    .name {
      .title {
        position: relative;
        bottom: 0.08em;
        word-break: keep-all;
        margin-right: 0.5rem;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      input {
        max-width: calc(100% - 1rem);
        border: none;
        padding: 0.5rem;
        &:focus {
          outline: none;
        }
      }
      .useborder {
        max-width: 50%;
      }
    }

    .btn {
      margin: auto;
      display: block;
    }
  }
</style>