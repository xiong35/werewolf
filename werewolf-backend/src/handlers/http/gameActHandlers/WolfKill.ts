import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import {
  GameStatus,
  TIMEOUT,
} from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import {
  GameActHandler,
  Response,
  startCurrentState,
  status2Handler,
} from "./";
import { WolfKillCheckHandler } from "./WolfKillCheck";

export const WolfKillHandler: GameActHandler = {
  curStatus: GameStatus.WOLF_KILL,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 记录所作的操作
    player.characterStatus.wantToKills =
      player.characterStatus.wantToKills || [];
    player.characterStatus.wantToKills[room.currentDay] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    room.currentDay++;
    startCurrentState(this, room);
    // TODO 告知狼队友?
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
      // 如果没有放弃杀人'
      const toKillIndex = voteRes[0];
      const toKillPlayer = room.getPlayerByIndex(toKillIndex);
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

    // 进入下一状态， 狼人确认杀人结果
    WolfKillCheckHandler.startOfState(room);
  },
};
