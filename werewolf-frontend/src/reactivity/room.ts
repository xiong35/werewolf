import { reactive, onMounted, ref } from "vue";
import { createRoom } from "../http/room";
import { CreateRoomRequest } from "../../shared/httpMsg/CreateRoomMsg";
import { SetableCharacters } from "../../shared/GameDefs";

export const characters = reactive<
  Record<SetableCharacters, number>
>({
  GUARD: 0,
  HUNTER: 0,
  SEER: 0,
  VILLAGER: 0,
  WEREWOLF: 0,
  WITCH: 0,
});

export function setCharacter(
  character: SetableCharacters,
  type: 1 | -1
): boolean | void {
  if (characters[character] + type < 0) return false;
  characters[character] += type;
  return true;
}

export const nickname = ref<string>("");
