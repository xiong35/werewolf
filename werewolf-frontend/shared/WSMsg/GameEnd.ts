import { Character } from "../GameDefs";
import {} from "../ModelDefs";

/**
 * Server to Client
 */
export interface GameEndMsg {
  winner: "WEREWOLF" | "VILLAGER"; // TODO 限制为 Character 类型
}
