import io from "../";
import { Events } from "../../../werewolf-frontend/shared/WSEvents";
import { GameEndMsg } from "../../../werewolf-frontend/shared/WSMsg/GameEnd";
import { Room } from "../models/RoomModel";

const CLEAR_ROOM_TIME = 3600 * 1000;

/**
 * @param room 当前房间
 * @return {Promise<boolean>} 是否已经结束
 */
export function checkGameOver(room: Room): boolean {
  // TODO 添加游戏结束的状态
  const { werewolf, villager } = room.players.reduce(
    (prev, p) => {
      if (p.isAlive) {
        if (p.character === "WEREWOLF") prev.werewolf++;
        else prev.villager++;
      }
      return prev;
    },
    { werewolf: 0, villager: 0 }
  );

  // console.log("# checkGameOver", { werewolf, villager }); // TODO
  if (werewolf >= villager || werewolf === 0) {
    // 通知游戏已结束
    const winner = werewolf === 0 ? "VILLAGER" : "WEREWOLF";
    io.to(room.roomNumber).emit(Events.GAME_END, {
      winner,
    } as GameEndMsg);

    /* 设置房间状态 */
    room.isFinished = true;
    clearTimeout(room.timer);
    clearTimeout(room.clearSelfTimer);
    /* 关闭 sockets */
    // make all Socket instances leave the room
    io.socketsLeave(room.roomNumber);
    // make all Socket instances in the room disconnect (and close the low-level connection)
    io.in(room.roomNumber).disconnectSockets(true);
    /* 删除此房间 */
    setTimeout(() => {
      Room.clearRoom(room.roomNumber);
    }, CLEAR_ROOM_TIME);
    return true;
  } else {
    return false;
  }
}
