<template>
  <div class="waitroom">
    <RoomPlayerList></RoomPlayerList>
    <div id="qr-code"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, onMounted } from "vue";
  import QRCode from "easyqrcodejs";

  import { CLIENT_BASE_URL } from "../../shared/constants";
  import RoomPlayerList from "../components/RoomPlayerList.vue";

  const WaitRoom = defineComponent({
    name: "WaitRoom",
    components: { RoomPlayerList },
    props: {
      pw: String,
      number: String,
    },
    setup(props) {
      const { pw, number } = toRefs(props);
      onMounted(() => {
        new QRCode(document.getElementById("qr-code"), {
          text: `${CLIENT_BASE_URL}/joinRoom?pw=${pw}&number=${number}`,
          logo: "/wolf.png",
          logoWidth: 20,
          logoHeight: 20,
          width: 100,
          height: 100,
        });
      });
    },
  });

  export default WaitRoom;
</script>


<style lang="scss" scoped>
  .waitroom {
  }
</style>