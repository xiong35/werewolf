import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response, status2Handler } from "./";
import { nextStateOfWolfKill } from "./ChangeStateHandler";

export const WolfKillHandler: GameActHandler = {
  async handleHttp(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 记录所作的操作
    player.characterStatus.wantToKills[room.currentDay] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  async endOfState(room: Room) {
    // 准备工作
    const werewolfs = room.players.filter(
      (p) => p.character === "WEREWOLF"
    );
    const today = room.currentDay;
    const votes = werewolfs.map(
      (p) => p.characterStatus?.wantToKills?.[today]
    );
    console.log("# WolfKill", { votes });

    // 找到死者
    const voteRes = getVoteResult(votes);
    console.log("# WolfKill", { voteRes });
    if (voteRes !== null) {
      // 如果没有放弃杀人
      const toKillIndex = voteRes[0];
      const toKillPlayer = room.players.find(
        (p) => p.index === toKillIndex
      );
      if (toKillPlayer) {
        // 设置死亡
        toKillPlayer.die = {
          at: today,
          fromIndex: werewolfs.reduce<index[]>(
            (prev, cur) =>
              cur.characterStatus?.wantToKills?.[today] ===
              toKillIndex
                ? [...prev, cur.index]
                : prev,
            [] as index[]
          ),
          fromCharacter: "WEREWOLF",
        };
      }
      console.log("# WolfKill", { toKillPlayer });
    }

    // 通知所有人更新状态
    const nextState = nextStateOfWolfKill(room);
    const timeout = TIMEOUT[nextState];
    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      setDay: room.currentDay,
      setStatus: nextState,
      timeout,
    } as ChangeStatusMsg);

    // 设置下一状态的定时器
    const endOfNextState = status2Handler[nextState].endOfState;
    clearTimeout(room.timer);
    room.timer = setTimeout(
      () => endOfNextState(room),
      timeout * 1000
    );
  },
};
