import { ref, Ref, computed } from "vue";

import {
  PublicPlayerDef,
  CharacterStatus,
  day,
  GameEvent,
} from "../../shared/ModelDefs";
import { Character, GameStatus } from "../../shared/GameDefs";
import { getGameStatus } from "../http/gameStatus";

export const players: Ref<PublicPlayerDef[]> = ref([]);
export const needingCharacters = ref<Character[]>([]);

export const characterStatus = ref<CharacterStatus>({});
export const character = ref<Character>("");

export const date = ref<day>(-1);

export const gameEvents = ref<GameEvent[]>([]);
export const gameStatus = ref<GameStatus>(GameStatus.WOLF_KILL);

export async function refresh() {
  const { data } = await getGameStatus({});
  character.value = data.curCharacter;
  date.value = data.curDay;
  characterStatus.value = data.curStatus;
  gameEvents.value = data.events;
  gameStatus.value = data.gameStatus;
  players.value = data.players;
  data.self; // TODO
}
