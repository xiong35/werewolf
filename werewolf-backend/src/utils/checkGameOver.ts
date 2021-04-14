import io from "src";
import { PlayerProps } from "src/models/PlayerModel";
import { RoomProps } from "src/models/RoomModel";
import { Events } from "../../../werewolf-frontend/shared/WSEvents";

/**
 * @param room 当前房间
 * @param players 当前所有玩家
 * @return {Promise<boolean>} 是否已经结束
 */
export async function checkGameOver(
  room: RoomProps,
  players: PlayerProps[]
): Promise<boolean> {
  const { werewolf, villager } = players.reduce(
    (prev, p) => {
      if (p.isAlive) {
        if (p.character === "WEREWOLF") prev.werewolf++;
        else prev.villager++;
      }
      return prev;
    },
    { werewolf: 0, villager: 0 }
  );
  if (werewolf >= villager || werewolf === 0) {
    // TODO 哪一边获胜?
    io.to(room.roomNumber).emit(Events.GAME_END /* TODO */);
    room.isFinished = true;
    await room.save();
    return true;
  } else {
    return false;
  }
}
