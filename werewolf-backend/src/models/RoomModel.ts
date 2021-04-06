import { Schema, model, Model, Document } from "mongoose";
import {
  RoomDef,
  PlayerDef,
  PublicPlayerDef,
} from "../../../werewolf-frontend/shared/ModelDefs";

const roomSchema = new Schema({
  roomNumber: String,
  creatorID: Schema.Types.ObjectId,
  playerIDs: { type: [Schema.Types.ObjectId], ref: "Players" },
  currentDay: { type: Number, default: 0 },
  needingCharacters: [String],
  remainingCharacters: [String],
  remainingIndexes: [Number],
  isFinished: { type: Boolean, default: false },
  gameStatus: { type: [String], default: [] },
  password: String,
});

roomSchema.static("listAll", function (roomNumber: string) {
  return new Promise((res) => {
    this.findOne({ roomNumber })
      .populate("playerIDs")
      .exec(function (err, room) {});
  });
});

interface RoomProps extends RoomDef, Document {}

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
  return new Promise((res) => {
    room.populate("playerIDs", (err, room) => {
      const players = (room.playerIDs as unknown) as PlayerDef[];
      res(
        players.map((p) => ({
          index: p.index,
          isAlive: p.isAlive,
          isSheriff: p.isSheriff,
          name: p.name,
        }))
      );
    });
  });
}
