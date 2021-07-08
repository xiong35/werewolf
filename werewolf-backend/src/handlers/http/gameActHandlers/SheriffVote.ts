import { Context } from "koa";
import io from "src";
import { createError } from "src/middleware/handleError";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";

export const SheriffVoteHandler: GameActHandler = {
  async handleHttp(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    if (!room.getPlayerByIndex(target)?.isElecting)
      createError({ status: 400, msg: "选择的玩家未参与竞选" });

    player.sheriffVotes[0] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  async endOfState(room: Room) {
    const votes = room.players.map((p) => p.sheriffVotes[0]);

    // 找到警长人选
    const voteRes = getVoteResult(votes);
    if (voteRes !== null) {
      // TODO 添加警长发言状态, 添加 pk 环节
      // 如果没有全部弃票
      // const toKillIndex = voteRes[0];
      // const toKillPlayer = room.players.find(
      //   (p) => p.index === toKillIndex
      // );
      // if (toKillPlayer) {
      //   // 设置死亡
      //   toKillPlayer.die = {
      //     at: today,
      //     fromIndex: werewolfs.reduce<index[]>(
      //       (prev, cur) =>
      //         cur.characterStatus?.wantToKills?.[today] ===
      //         toKillIndex
      //           ? [...prev, cur.index]
      //           : prev,
      //       [] as index[]
      //     ),
      //     fromCharacter: "WEREWOLF",
      //   };
      // }
      // console.log("# WolfKill", { toKillPlayer });
    }
  },
};
