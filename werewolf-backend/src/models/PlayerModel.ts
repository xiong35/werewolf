import { Character } from "../../../werewolf-frontend/shared/GameDefs";
import {
    CharacterStatus, PlayerDef, PublicPlayerDef
} from "../../../werewolf-frontend/shared/ModelDefs";

export class Player implements PlayerDef {
  character: Character;
  characterStatus: CharacterStatus;
  die: {
    at: number;
    fromIndex: number[];
    fromCharacter: Character;
  };
  hasVotedAt: number[] = [];
  sheriffVotes: number[] = [];
  index: number;
  name: string;
  isAlive: boolean = true;
  isSheriff: boolean = false;
  _id: string;

  constructor({ name, index }: { name: string; index: number }) {
    this.name = name;
    this.index = index;

    this._id =
      Math.random().toString(36).substring(2) + "." + Date.now();
  }

  toPublic(): PublicPlayerDef {
    return {
      index: this.index,
      isAlive: this.isAlive,
      isSheriff: this.isSheriff,
      name: this.name,
    };
  }
}
