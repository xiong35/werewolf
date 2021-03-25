import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  roomNumber: String,
  creatorID: String,
  playerIDs: [String],
  currentDay: Number,
  needingCharacters: [String],
  remainingCharacters: [String],
  remainingIndexes: [Number],
  isFinished: Boolean,
  nextStatus: [String],
});

export const RoomModel = model("room", roomSchema);
