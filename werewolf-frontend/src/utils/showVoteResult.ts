import { VoteResultMsg } from "../../shared/httpMsg/VoteResult";
import { showDialog } from "../reactivity/dialog";

/** 强行 hack 出 jsx 的效果 */
export function showVoteResult(res: VoteResultMsg) {
  let playerHTML = "";

  if (res.data.result) {
    res.data.result.forEach(
      (index) =>
        (playerHTML += `
        <div class="die-player">
          <div class="player-index">${index}</div>号
        </div>
`)
    );
  }
  const innerHTML = `
<style>
  .die-player-wrapper {
    display: flex;
    margin-top: 10px;
  }

  .die-player-wrapper .die-player {
    display: flex;
    align-items: flex-end;
    margin: 5px;
  }

  .die-player-wrapper .die-player .player-index {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 999px;
    background-color: var(--on-bg);
    color: var(--bg);
  }
</style>

<div class="die-player-wrapper">
  ${playerHTML}
</div>
`;
  showDialog(`${res.data.hintText} ${innerHTML}`, 4);
}
