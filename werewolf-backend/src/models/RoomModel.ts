import { Schema, model, Model, Document } from "mongoose";
import { GameStatus } from "../../../werewolf-frontend/shared/GameDefs";
import {
  RoomDef,
  PublicPlayerDef,
} from "../../../werewolf-frontend/shared/ModelDefs";
import { choosePublicInfo, PlayerProps } from "./PlayerModel";

const roomSchema = new Schema({
  roomNumber: String,
  password: String,
  creatorID: Schema.Types.ObjectId,
  playerIDs: { type: [Schema.Types.ObjectId], ref: "Players" },
  needingCharacters: [String],
  remainingCharacters: [String],
  remainingIndexes: [Number],
  isFinished: { type: Boolean, default: false },

  currentDay: { type: Number, default: 0 },
  gameStatus: { type: [String], default: [GameStatus.WOLF_KILL] },

  joinElect: { type: [Number], default: [] },
  finishSpeaking: { type: [Number], default: [] },

  timmer: Number,
});

export interface RoomProps extends RoomDef, Document {}

const Room: Model<RoomProps> = model("Rooms", roomSchema);

export default Room;

export function listAllOfNumber(
  roomNumber: string
): Promise<PublicPlayerDef[]> {
  return new Promise((res) => {
    Room.findOne({ roomNumber }).exec((err, room) => {
      if (!room || err) throw new Error();
      res(listAllOfRoom(room));
    });
  });
}

export function listAllOfRoom(
  room: RoomProps
): Promise<PublicPlayerDef[]> {
  return new Promise((resolve) => {
    room.populate("playerIDs", (err, room) => {
      const players = (room.playerIDs as unknown) as PlayerProps[];
      resolve(choosePublicInfo(players));
    });
  });
}
