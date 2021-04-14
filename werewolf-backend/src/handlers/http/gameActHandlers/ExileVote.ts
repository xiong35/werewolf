import io from "src";
import {
  choosePublicInfo,
  PlayerProps,
} from "src/models/PlayerModel";
import Room from "src/models/RoomModel";
import { dieCheckout } from "src/utils/dieCheckout";
import { ActHandler, Response } from ".";
import { GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ChangeStatusMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ChangeStatus";

export const ExileVoteHandler: ActHandler = async (
  room,
  player,
  target,
  ctx
) => {
  const day = room.currentDay;
  player.hasVotedAt[day] = target > 0 ? target : -1;
  await player.save();

  const players = ((await room.execPopulate())
    .playerIDs as unknown) as PlayerProps[];
  if (players.every((p) => p.hasVotedAt[day] !== undefined)) {
  } else {
  }

  return {
    status: 200,
    msg: "ok",
    data: {},
  };
};

export async function finishExileVote(
  roomNumber: string,
  players?: PlayerProps[]
): Promise<Response> {
  const room = await Room.findOne({ roomNumber });
  if (!players) {
    players = ((await room.execPopulate())
      .playerIDs as unknown) as PlayerProps[];
  }

  const day = room.currentDay;

  // 处死
  const toDie = players
    .reduce<number[]>((prev, cur) => {
      const index = cur.hasVotedAt[day];
      if (prev[index] === undefined) prev[index] = 0;
      prev[index]++;
      return prev;
    }, [])
    .reduce((maxInd, cur, index, arr) => {
      if (arr[maxInd] > cur) {
        return maxInd;
      } else {
        return index;
      }
    }, 0);
  const diePlayer = players.find((p) => p.index === toDie);
  diePlayer.die = {
    at: day,
    fromCharacter: "VILLAGER",
    fromIndex: players.reduce<number[]>(
      (prev, p) =>
        p.hasVotedAt[day] === toDie ? [...prev, p.index] : prev,
      []
    ),
  };
  diePlayer.isAlive = false;
  await diePlayer.save();

  // 通知结果
  const leaveMsgTime = 90;
  const msg: ChangeStatusMsg = {
    day,
    timeout: leaveMsgTime,
    publicMsg: {
      result: toDie,
      for: "EXILE",
    },
    setStatus: GameStatus.LEAVE_MSG,
    curPlayerStatus: choosePublicInfo(players),
  };
  io.to(roomNumber).emit(Events.CHANGE_STATUS, msg); // to LEAVE_MSG

  room.timmer = setTimeout(async () => {
    // 警长或猎人 -> 死亡结算
    if (diePlayer.character === "HUNTER" || diePlayer.isSheriff) {
      return dieCheckout(room, diePlayer);
    }
    // 其他 -> 进入黑夜
    const newRoom = await Room.findOne({ roomNumber });
    if (newRoom.timmer === room.timmer) {
      newRoom.timmer = null;
      room.currentDay++;

      const msg: ChangeStatusMsg = {
        day: room.currentDay,
        timeout: null,
        publicMsg: {},
        setStatus: GameStatus.WOLF_KILL,
        curPlayerStatus: choosePublicInfo(players),
      };

      io.to(roomNumber).emit(Events.CHANGE_STATUS, msg); // to WOLF_KILL
    }
  }, leaveMsgTime * 1000);

  await room.save();

  return {
    status: 200,
    msg: "ok",
    data: {},
  };
}