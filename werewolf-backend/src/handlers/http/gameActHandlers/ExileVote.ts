import io from "src";
import {
  choosePublicInfo,
  PlayerProps,
} from "src/models/PlayerModel";
import Room, {
  listAllOfRoom,
  RoomProps,
} from "src/models/RoomModel";
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

  const players = await listAllOfRoom(room);
  if (players.every((p) => p.hasVotedAt[day] !== undefined)) {
    return finishExileVote(room.roomNumber);
  }

  return {
    status: 200,
    msg: "ok",
    data: {},
  };
};

export async function finishExileVote(
  roomNumber: string
): Promise<Response> {
  // TODO check roomNumber when create and search
  const room = await Room.findOne({
    roomNumber,
    isFinished: false,
  });
  const players = await listAllOfRoom(room);

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
  room.gameStatus.push(GameStatus.LEAVE_MSG);
  io.to(room.roomNumber).emit(Events.CHANGE_STATUS, msg); // to LEAVE_MSG

  room.timmer = setTimeout(async () => {
    // 警长或猎人 -> 死亡结算
    if (diePlayer.character === "HUNTER" || diePlayer.isSheriff) {
      return dieCheckout(room.roomNumber, diePlayer._id);
    }
    // 其他 -> 进入黑夜
    const newRoom = await Room.findOne({
      roomNumber: room.roomNumber,
      isFinished: false,
    });
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

      newRoom.gameStatus.push(GameStatus.WOLF_KILL);
      await newRoom.save();

      io.to(newRoom.roomNumber).emit(Events.CHANGE_STATUS, msg); // to WOLF_KILL
    }
  }, leaveMsgTime * 1000);

  await room.save();

  return {
    status: 200,
    msg: "ok",
    data: {},
  };
}
