import { Context } from "koa";
import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { getVoteResult } from "src/utils/getVoteResult";

import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { GameActHandler, Response } from "./";

export const BeforeDayDiscussHandler: GameActHandler = {
  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    // TODO 真正设置 isAlive 字段
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  async endOfState(room: Room) {},
  startOfState: function (room: Room): void {
    // 当执行到这里的时候, 意味着刚刚进入白天
    // 此时应该进行夜晚的结算并通知所有人获得晚上的消息了

    // 将夜晚死的人的 isAlive 设为false
    room.players
      .filter((p) => {
        const isKilledLastNight =
          p.die?.at === room.currentDay - 1;
        return isKilledLastNight;
      })
      .forEach((p) => (p.isAlive = false));
    // 守卫保的人和女巫救的人会设置 die = null, 故不会被设置为死亡
  },
};
