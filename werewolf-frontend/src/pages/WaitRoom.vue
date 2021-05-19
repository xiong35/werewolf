<template>
  <div class="waitroom">
    <RoomPlayerList :playerList="playerList"></RoomPlayerList>
    <div class="room-number">房间号：{{ number }}</div>
    <div id="qr-code"></div>
    <Btn @click="showDialog('暂未实现')" content="查看规则"></Btn>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    toRefs,
    onMounted,
    computed,
  } from "vue";
  import QRCode from "easyqrcodejs";

  import { CLIENT_BASE_URL } from "../../shared/constants";
  import RoomPlayerList from "../components/RoomPlayerList.vue";
  import Btn from "../components/Btn.vue";
  import { showDialog } from "../reactivity/dialog";
  import { players, needingCharacters } from "../reactivity/game";
  import { initRoom } from "../http/room";

  const WaitRoom = defineComponent({
    name: "WaitRoom",
    components: { RoomPlayerList, Btn },
    props: {
      pw: { type: String, required: false },
      number: { type: String, required: true },
    },
    setup(props) {
      const { pw, number } = toRefs(props);
      onMounted(async () => {
        new QRCode(document.getElementById("qr-code"), {
          text: `${CLIENT_BASE_URL}/joinRoom?pw=${
            pw && pw.value
          }&number=${number && number.value}`,
          logo: "/wolf.png",
          logoWidth: 20,
          logoHeight: 20,
          width: 100,
          height: 100,
        });
        const res = await initRoom({ roomNumber: number.value });
        if (res && res.status === 200) {
          players.value = res.data.players;
          needingCharacters.value = res.data.needingCharacters;
        }
      });

      const playerList = computed(() => {
        return new Array(needingCharacters.value.length)
          .fill(0)
          .map(
            (_, ind) =>
              players.value.find(
                (player) => player.index === ind + 1
              ) ?? {
                index: ind + 1,
              }
          );
      });

      return { showDialog, playerList };
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
    .room-number {
      font-weight: bold;
      font-size: 1.6rem;
      text-align: center;
    }
    .btn {
      display: block;
      text-align: center;
    }
  }
</style>
