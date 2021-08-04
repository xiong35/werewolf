import { PlayerDef } from "../../shared/ModelDefs";
import { GameEndMsg } from "../../shared/WSMsg/GameEnd";
import { groupedGameEvents } from "../reactivity/computeGameEvents";
import { showDialog } from "../reactivity/dialog";
import { players, refresh, self } from "../reactivity/game";
import { roomNumber } from "../reactivity/joinRoom";
import { saveRecord } from "../reactivity/record";
import router from "../router";
import { socket } from "./";

export default async function gameEnd(msg: GameEndMsg) {
  socket.removeAllListeners();
  socket.disconnect();

  // console.log("# gameEnd", "end");
  // TODO game over

  await refresh();

  const time = Date.now();

  saveRecord(
    groupedGameEvents.value,
    roomNumber.value,
    self.value,
    players.value as PlayerDef[],
    time
  );

  showDialog(
    `<b>游戏结束</b> </br> 获胜者为${
      msg.winner === "WEREWOLF" ? "狼人" : "村民"
    }`
  );

  router.replace({
    name: "review-detail",
    query: {
      roomNumber: roomNumber.value,
      time,
    },
  });
}
