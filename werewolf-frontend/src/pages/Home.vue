<template>
  <div class="main-page">
    <img src="../../public/wolf.png" alt="logo" class="logo" />
    <div class="spacer"></div>
    <Btn class="main-page-btn" content="加入房间"></Btn>
    <Btn class="main-page-btn" content="创建房间"></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  import Btn from "../components/Btn.vue";

  const Home = defineComponent({
    name: "Home",
    components: { Btn },
    setup(props) {
      const count = ref(1);

      const add = () => {
        count.value++;
      };

      return { add, count };
    },
  });
  export default Home;
</script>


<style lang="scss" scoped>
  .main-page {
    .logo {
      padding-top: 10vh;
      width: 20vh;
      margin: auto;
      display: block;
    }

    .spacer {
      height: 10vh;
    }

    .main-page-btn {
      display: block;
      margin: 5vh auto;
    }
  }
</style>