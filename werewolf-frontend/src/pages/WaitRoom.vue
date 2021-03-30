<template>
  <div class="waitroom">
    <RoomPlayerList></RoomPlayerList>
    <div id="qr-code"></div>
    <Btn @click="showDialog('暂未实现')" content="查看规则"></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, onMounted } from "vue";
  import QRCode from "easyqrcodejs";

  import { CLIENT_BASE_URL } from "../../shared/constants";
  import RoomPlayerList from "../components/RoomPlayerList.vue";
  import Btn from "../components/Btn.vue";
  import { showDialog } from "../reactivity/dialog";

  const WaitRoom = defineComponent({
    name: "WaitRoom",
    components: { RoomPlayerList, Btn },
    props: {
      pw: String,
      number: String,
    },
    setup(props) {
      const { pw, number } = toRefs(props);
      onMounted(() => {
        new QRCode(document.getElementById("qr-code"), {
          text: `${CLIENT_BASE_URL}/joinRoom?pw=${pw?.value}&number=${number?.value}`,
          logo: "/wolf.png",
          logoWidth: 20,
          logoHeight: 20,
          width: 100,
          height: 100,
        });
      });

      return { showDialog };
    },
  });

  export default WaitRoom;
</script>


<style lang="scss" scoped>
  .waitroom {
    #qr-code {
      margin: 5vh auto;
      width: min-content;
    }
    .btn {
      display: block;
      text-align: center;
    }
  }
</style>