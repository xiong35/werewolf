<template>
  <div class="waitroom">
    <div id="qr-code"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import QRCode from "easyqrcodejs";

  const WaitRoom = defineComponent({
    name: "WaitRoom",
    components: {},
    mounted() {
      new QRCode(document.getElementById("qr-code"), {
        text: "https://cssscript.com",
        logo: "/wolf.png",
        logoWidth: 20,
        logoHeight: 20,
        // logoBackgroundColor: "pink",
        logoBackgroundTransparent: true,
        width: 100,
        height: 100,
      });
    },

    setup(props) {},
  });

  export default WaitRoom;
</script>


<style lang="scss" scoped>
  .waitroom {
  }
</style>