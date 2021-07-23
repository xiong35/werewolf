import { Character, GameStatus, TIMEOUT } from "../../shared/GameDefs";
import { ChangeStatusMsg } from "../../shared/WSMsg/ChangeStatus";
import { getWolfKillResNShow, witchGetDieNShow } from "../http/gameGetHint";
import { getGameStatus } from "../http/gameStatus";
import { date, gameStatus, gameStatusTimeLeft, refresh, self } from "../reactivity/game";

/*  */

export default function changeStatus(msg: ChangeStatusMsg) {
  console.log("# changeStatus", { msg });
  date.value = msg.setDay;
  gameStatus.value = msg.setStatus;

  gameStatusTimeLeft.value = msg.timeout || TIMEOUT[msg.setStatus];

  refresh();

  if (
    msg.setStatus === GameStatus.WOLF_KILL_CHECK &&
    self.value.character === "WEREWOLF"
  ) {
    getWolfKillResNShow();
  } else if (
    msg.setStatus === GameStatus.WITCH_ACT &&
    self.value.character === "WITCH"
  ) {
    witchGetDieNShow();
  }
}
