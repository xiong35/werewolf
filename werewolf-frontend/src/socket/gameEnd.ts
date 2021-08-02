import { GameEndMsg } from "../../shared/WSMsg/GameEnd";
import { socket } from "./";

export default function gameEnd(msg: GameEndMsg) {
  socket.removeAllListeners();
  socket.disconnect();

  console.log("# gameEnd", "end");
  // TODO game over
}
