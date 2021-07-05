import { Character, GameStatus, TIMEOUT } from "../../shared/GameDefs";
import { ChangeStatusMsg } from "../../shared/WSMsg/ChangeStatus";
import { date, gameStatus, self } from "../reactivity/game";

/*  */

export default function changeStatus(msg: ChangeStatusMsg) {
  date.value = msg.setDay;
  gameStatus.value = msg.setStatus;
}
