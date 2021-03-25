import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  roomNumber: String,
  creatorID: String,
  playerIDs: { type: [Schema.Types.ObjectId], ref: "Players" },
  currentDay: Number,
  needingCharacters: [String],
  remainingCharacters: [String],
  remainingIndexes: [Number],
  isFinished: Boolean,
  nextStatus: [String],
});

const Room = model("Rooms", roomSchema);

export default Room;
