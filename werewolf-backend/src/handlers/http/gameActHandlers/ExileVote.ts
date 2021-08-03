import { Context } from "koa";

import io from "../../..";
import { GameStatus, TIMEOUT } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";
import { createError } from "../../../middleware/handleError";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { getVoteResult, Vote } from "../../../utils/getVoteResult";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { GameActHandler, Response, startCurrentState } from "./";
import { DayDiscussHandler } from "./DayDiscuss";
import { ExileVoteCheckHandler } from "./ExileVoteCheck";

export const ExileVoteHandler: GameActHandler = {
  curStatus: GameStatus.EXILE_VOTE,

  async handleHttpInTheState(
    room: Room,
    player: Player,
    target: index,
    ctx: Context
  ) {
    if (!room.getPlayerByIndex(target).canBeVoted)
      createError({
        status: 401,
        msg: "此玩家不参与投票",
      });

    player.hasVotedAt[room.currentDay] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    startCurrentState(this, room);
  },

  async endOfState(room: Room) {
    const votes: Vote[] = room.players.map((p) => ({
      from: p.index,
      voteAt: p.hasVotedAt[room.currentDay],
    }));

    const highestVotes = getVoteResult(votes);

    // 如果没有全部弃票
    if (!highestVotes || highestVotes.length === 0) {
      // 如果所有人都弃票
      // 直接进入白天
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: "所有人都弃票, 即将进入夜晚",
      });
      return ExileVoteCheckHandler.startOfState(
        room,
        GameStatus.WOLF_KILL
      );
    } else if (highestVotes.length === 1) {
      // 如果有票数最高的人
      // 此人被处死, 进入死亡结算
      room.getPlayerByIndex(highestVotes[0]).isDying = true;
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "被处死的玩家为:",
          highestVotes
        ),
      });
      room.curDyingPlayer = room.getPlayerByIndex(highestVotes[0]);

      room.curDyingPlayer.isDying = true;
      room.curDyingPlayer.isAlive = false;
      return ExileVoteCheckHandler.startOfState(
        room,
        GameStatus.LEAVE_MSG
      );
    } else {
      // 如果多人平票

      // 警长当 1.5 票
      const sheriff = room.players.find((p) => p.isSheriff);
      if (sheriff) {
        const sheriffChoice = sheriff.hasVotedAt[room.currentDay];
        if (highestVotes.includes(sheriffChoice)) {
          // 虽然有平票, 但是警长选择的人在此之中, 则此人死亡
          room.getPlayerByIndex(highestVotes[0]).isDying = true;
          io.to(room.roomNumber).emit(Events.SHOW_MSG, {
            innerHTML: renderHintNPlayers("被处死的玩家为:", [
              sheriffChoice,
            ]),
          });
          room.curDyingPlayer = room.getPlayerByIndex(
            highestVotes[0]
          );
          room.curDyingPlayer.isDying = true;
          room.curDyingPlayer.isAlive = false;
          return ExileVoteCheckHandler.startOfState(
            room,
            GameStatus.LEAVE_MSG
          );
        }
      }
      // 若最高票中无警长的影响
      // 设置参与投票的人是他们几个
      // 设置他们未结束发言
      room.players.forEach(
        (p) => (p.canBeVoted = highestVotes.includes(p.index))
      );
      // 告知所有人现在应该再依次投票
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "平票的玩家如下, 请再次依次进行发言",
          highestVotes
        ),
      });
      room.toFinishPlayers = new Set(highestVotes);

      // 设置下一阶段为自由发言
      return ExileVoteCheckHandler.startOfState(
        room,
        GameStatus.DAY_DISCUSS
      );
    }
  },
};
