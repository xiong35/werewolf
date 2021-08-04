import { index } from "../../../werewolf-frontend/shared/ModelDefs";

/**
 * 将提示信息和一串玩家渲染成好看的 html
 * @param hint
 * @param players
 * @return 渲染后的 html 片段
 */
export function renderHintNPlayers(
  hint: string,
  players?: index[]
): string {
  let playerHTML = "";
  if (players) {
    players.forEach(
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
      <div>${hint}</div>
      <div class="die-player-wrapper">
        ${playerHTML}
      </div>
      `;
  return innerHTML;
}
