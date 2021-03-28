<template>
  <div class="main-page">
    <img src="../assets/werewolf.svg" alt="logo" class="logo svg" />

    <div class="title">狼人杀</div>
    <Btn
      @click="$router.push('joinRoom')"
      class="main-page-btn"
      content="加入房间"
    ></Btn>
    <Btn
      @click="$router.push('createRoom')"
      class="main-page-btn"
      content="创建房间"
    ></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  import Btn from "../components/Btn.vue";

  const Home = defineComponent({
    name: "Home",
    components: { Btn },
    setup(props) {
      return {};
    },
  });
  export default Home;
</script>


<style lang="scss" scoped>
  @font-face {
    font-family: gete;
    src: url(../assets/gete.ttf);
  }

  .main-page {
    .logo {
      padding-top: 10vh;
      width: 20vh;
      margin: auto;
      display: block;
    }

    .title {
      margin: 7vh;
      text-align: center;
      font-size: 3rem;
      font-weight: bolder;
      font-family: gete;
    }

    .main-page-btn {
      display: block;
      margin: 5vh auto;
    }
  }
</style>