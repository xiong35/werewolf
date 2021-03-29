<template>
  <div class="joinroom">
    <div class="title">加入房间</div>
    <div class="number">
      <span class="hint">房号：</span>
      <UseBorder>
        <input maxlength="6" type="text" v-model="roomNumber" />
      </UseBorder>
    </div>
    <div class="pw">
      <span class="hint">密码：</span>
      <UseBorder>
        <input
          maxlength="20"
          type="text"
          placeholder="(可选)"
          v-model="password"
        />
      </UseBorder>
    </div>
    <div class="name">
      <span class="hint">昵称：</span>
      <UseBorder>
        <input maxlength="8" type="text" placeholder="" v-model="nickname" />
      </UseBorder>
    </div>
    <Btn @click="join" content="确认加入"></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from "vue";

  import UseBorder from "../components/UseBorder.vue";
  import Btn from "../components/Btn.vue";

  import { password, roomNumber, nickname, join } from "../reactivity/joinRoom";

  const JoinRoom = defineComponent({
    name: "JoinRoom",
    components: { UseBorder, Btn },
    props: {
      pw: String,
      number: String,
    },
    setup(props) {
      const { pw, number } = toRefs(props);
      if (pw?.value) password.value = pw.value;
      if (number?.value) roomNumber.value = number.value.slice(0, 6);

      return { password, roomNumber, nickname, join };
    },
  });

  export default JoinRoom;
</script>


<style lang="scss" scoped>
  .joinroom {
    text-align: center;
    .title {
      font-weight: bold;
      font-size: 2rem;
      padding-top: 2rem;
    }

    .pw,
    .name,
    .number {
      .hint {
        position: relative;
        bottom: 0.08em;
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
      position: fixed;
      bottom: 10vh;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>