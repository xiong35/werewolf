import { Schema, model, Model, Document } from "mongoose";

import {
  PlayerDef,
  PublicPlayerDef,
} from "../../../werewolf-frontend/shared/ModelDefs";

const playerSchema = new Schema({
  index: Number,
  name: String,
  isAlive: { type: Boolean, default: true },
  isSheriff: { type: Boolean, default: false },
  character: String,
  characterStatus: Schema.Types.Mixed,
  die: {
    at: { type: Number, default: -1 },
    fromIndex: [Number],
    fromCharacter: String,
  },
  hasVotedAt: { type: [Number], default: [] },
  sheriffVotes: { type: [Number], default: [] },
});

export interface PlayerProps extends Document, PlayerDef {}

const Player: Model<PlayerProps> = model("Players", playerSchema);

export function choosePublicInfo(
  players: PlayerProps[]
): PublicPlayerDef[] {
  return players
    .map((p) => ({
      index: p.index,
      isAlive: p.isAlive,
      isSheriff: p.isSheriff,
      name: p.name,
    }))
    .sort((a, b) => a.index - b.index);
}

export default Player;
