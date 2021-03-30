<template>
  <div class="waitroom">
    <div id="qr-code"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, onMounted } from "vue";

  import { CLIENT_BASE_URL } from "../../shared/constants";

  import QRCode from "easyqrcodejs";

  const WaitRoom = defineComponent({
    name: "WaitRoom",
    components: {},
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

      return {};
    },
  });

  export default WaitRoom;
</script>


<style lang="scss" scoped>
  .waitroom {
  }
</style>