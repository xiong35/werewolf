import { ref, Ref, computed } from "vue";

import {
  PublicPlayerDef,
  CharacterStatus,
  day,
  GameEvent,
} from "../../shared/ModelDefs";
import { Character, GameStatus } from "../../shared/GameDefs";
import { getGameStatus } from "../http/gameStatus";

export const players: Ref<PublicPlayerDef[]> = ref([
  { index: 1, name: "tada", isAlive: true, isSheriff: false },
  { index: 2, name: "@#$%^&", isAlive: false, isSheriff: false },
  { index: 3, name: "afevqqw", isAlive: true, isSheriff: true },
]);
export const needingCharacters = ref<Character[]>([
  "GUARD",
  "HUNTER",
  "WEREWOLF",
]); // TODO get this

export const characterStatus = ref<CharacterStatus>({
  protects: [],
});
export const character = ref<Character>("WITCH");

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
