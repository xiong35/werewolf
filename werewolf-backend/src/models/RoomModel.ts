import { Schema, model, Model, Document } from "mongoose";
import { RoomDef } from "../../../shared/ModelDefs";

const roomSchema = new Schema({
  roomNumber: String,
  creatorID: Schema.Types.ObjectId,
  playerIDs: { type: [Schema.Types.ObjectId], ref: "Players" },
  currentDay: { type: Number, default: 0 },
  needingCharacters: [String],
  remainingCharacters: [String],
  remainingIndexes: [Number],
  isFinished: { type: Boolean, default: false },
  nextStatus: { type: [String], default: [] },
  password: String,
});

interface RoomProps extends RoomDef, Document {}

const Room: Model<RoomProps> = model("Rooms", roomSchema);

export default Room;
