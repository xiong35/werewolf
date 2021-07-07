import { Character, GameStatus, TIMEOUT } from "../../shared/GameDefs";
import { ChangeStatusMsg } from "../../shared/WSMsg/ChangeStatus";
import { getWolfKillVote } from "../http/gameVoteResult";
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
    getWolfKillVote();
  }

  // TODO 检查是否要请求各个玩家能查看到状态
}
