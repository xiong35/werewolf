import { Character } from "../../../werewolf-frontend/shared/GameDefs";
import {
    CharacterStatus, PlayerDef, PublicPlayerDef
} from "../../../werewolf-frontend/shared/ModelDefs";

export class Player implements PlayerDef {
  character: Character; // is set when game begins

  hasVotedAt: number[] = [];
  sheriffVotes: number[] = [];
  isAlive: boolean = true;
  isSheriff: boolean = false;
  die: {
    at: number;
    fromIndex: number[];
    fromCharacter: Character;
  } = undefined;
  characterStatus: CharacterStatus = undefined;

  index: number;
  name: string;
  _id: string;

  constructor({ name, index }: { name: string; index: number }) {
    this.name = name;
    this.index = index;

    this._id =
      Math.random().toString(36).substring(2) + "." + Date.now(); // e.g. `sgbosfiyvdr.1621430145541`
  }

  /**
   * 将 Player 信息转换成公开的信息
   * @returns 可公开的信息
   */
  toPublic(): PublicPlayerDef {
    return {
      index: this.index,
      isAlive: this.isAlive,
      isSheriff: this.isSheriff,
      name: this.name,
    };
  }
}
