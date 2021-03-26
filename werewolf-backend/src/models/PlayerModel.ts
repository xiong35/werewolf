import { Schema, model, Model, Document } from "mongoose";

import { PlayerDef } from "../../../shared/ModelDefs";

const playerSchema = new Schema({
  index: Number,
  name: String,
  isAlive: { type: Boolean, default: true },
  isSheriff: { type: Boolean, default: false },
  character: String,
  characterStatus: Schema.Types.Mixed,
  die: {
    at: Number,
    fromIndex: [Number],
    fromCharacter: String,
  },
  hasVotedAt: { type: [Number], default: [] },
  sheriffVotes: { type: [Number], default: [] },
});

interface PlayerProps extends Document, PlayerDef {}

const Player: Model<PlayerProps> = model("Players", playerSchema);

export default Player;
