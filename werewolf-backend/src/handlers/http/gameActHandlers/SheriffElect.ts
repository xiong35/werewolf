import { Context } from "koa";

import io from "../../..";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { getVoteResult } from "../../../utils/getVoteResult";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { GameActHandler, Response, startCurrentState } from "./";
import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { SheriffSpeachHandler } from "./SheriffSpeach";

export const SheriffElectHandler: GameActHandler = {
  curStatus: GameStatus.SHERIFF_ELECT,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // 加入参与竞选的人
    player.canBeVoted = true;

    return {
      status: 200,
      msg: "ok",
      data: {},
    };
  },

  startOfState(room: Room) {
    room.currentDay++;
    startCurrentState(this, room);
  },

  async endOfState(room: Room) {
    const electingPlayers = room.players.filter(
      (p) => p.canBeVoted
    );

    if (!electingPlayers || electingPlayers.length === 0) {
      // 无人竞选就直接到天亮
      return BeforeDayDiscussHandler.startOfState(room);
    } else if (electingPlayers.length === 1) {
      // 只有一人竞选就把警长给他
      electingPlayers[0].isSheriff = true;
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "仅有此玩家参选, 直接成为警长",
          [electingPlayers[0].index]
        ),
      });
      // TODO 连续让前端显示文字, 后一次会覆盖前一次, 需要前端修改弹窗逻辑
      return BeforeDayDiscussHandler.startOfState(room);
    } else {
      // 有多人参选
      // 设置参选警长的人都未结束发言
      room.toFinishPlayers = new Set(
        electingPlayers.map((p) => p.index)
      );
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "参选警长的玩家如下, 请依次进行发言",
          electingPlayers.map((p) => p.index)
        ),
      });
      return SheriffSpeachHandler.startOfState(room);
    }
  },
};
