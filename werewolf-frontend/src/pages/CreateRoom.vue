<template>
  <div class="createroom">
    <span class="title">角色设置</span>
    <div class="tile-wrapper">
      <RoomCharacterTile
        :key="name"
        v-for="(name, value) in characters"
        :character="value"
      ></RoomCharacterTile>
    </div>
    <div class="name">
      <span class="hint">你的昵称：</span>
      <UseBorder>
        <input
          maxlength="10"
          type="text"
          placeholder="请输入昵称"
          v-model="nickname"
        />
      </UseBorder>
    </div>
    <div class="password">
      <span class="hint">房间密码：</span>
      <UseBorder>
        <input
          type="text"
          maxlength="20"
          placeholder="(可选)"
          v-model="password"
        />
      </UseBorder>
    </div>
    <Btn @click="create()" content="确认创建"></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import RoomCharacterTile from "../components/RoomCharacterTile.vue";
  import Btn from "../components/Btn.vue";
  import UseBorder from "../components/UseBorder.vue";

  import {
    characters,
    nickname,
    password,
    create,
  } from "../reactivity/createRoom";
  import { showDialog } from "../reactivity/dialog";

  const CreateRoom = defineComponent({
    name: "CreateRoom",
    components: { RoomCharacterTile, Btn, UseBorder },
    setup(props) {
      return {
        characters,
        nickname,
        password,
        create,
        showDialog,
      };
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

    .name,
    .password {
      .hint {
        position: relative;
        bottom: 0.04em;
        word-break: keep-all;
        margin-right: 0.5rem;
        font-weight: bold;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 2rem 0;
      input {
        max-width: calc(100% - 1rem);
        padding: 0.5rem;
      }
      .useborder {
        max-width: 50%;
      }
    }

    .btn {
      margin: auto;
    }
  }
</style>