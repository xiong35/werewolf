import { Character, GameStatus, TIMEOUT } from "../../shared/GameDefs";
import { ChangeStatusMsg } from "../../shared/WSMsg/ChangeStatus";
import { getWolfKillResNShow } from "../http/gameGetHint";
import { date, gameStatus, gameStatusTimeLeft, self } from "../reactivity/game";

/*  */

export default function changeStatus(msg: ChangeStatusMsg) {
  console.log("# changeStatus", { msg });
  date.value = msg.setDay;
  gameStatus.value = msg.setStatus;

  gameStatusTimeLeft.value = TIMEOUT[msg.setStatus];

  if (
    msg.setStatus === GameStatus.WOLF_KILL_CHECK &&
    self.value.character === "WEREWOLF"
  ) {
    getWolfKillResNShow();
  }

  // TODO 检查是否要请求各个玩家能查看到状态
}
