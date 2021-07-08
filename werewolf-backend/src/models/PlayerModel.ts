import { Character } from "../../../werewolf-frontend/shared/GameDefs";
import {
    CharacterStatus, day, ID, index, PlayerDef, PublicPlayerDef
} from "../../../werewolf-frontend/shared/ModelDefs";

export class Player implements PlayerDef {
  character: Character; // is set when game begins

  hasVotedAt: index[];
  sheriffVotes: index[] = [];
  isAlive = true;
  isSheriff = false;
  die?: {
    at: day;
    fromIndex: index[];
    fromCharacter: Character;
  };
  characterStatus?: CharacterStatus;

  index: index;
  name: string;
  _id: ID;

  constructor({ name, index }: { name: string; index: number }) {
    this.name = name;
    this.index = index;

    this._id =
      Math.random().toString(36).substring(2) + "." + Date.now(); // e.g. `5fs6yt6htlu.1621430145541`
  }
  isLeavingMsg: boolean = false;
  isElecting: boolean = false;

  /**
   * 将 Player 信息转换成公开的信息
   * @returns 可公开的信息
   */
  getPublic(): PublicPlayerDef {
    return {
      index: this.index,
      isAlive: this.isAlive,
      isSheriff: this.isSheriff,
      name: this.name,
    };
  }
}
