import { reactive, onMounted, ref } from "vue";
import * as sha256 from "sha256";
import { createRoom } from "../http/room";
import { CreateRoomRequest } from "../../shared/httpMsg/CreateRoomMsg";
import { SetableCharacters } from "../../shared/GameDefs";

export const characters = reactive<
  Record<SetableCharacters, number>
>({
  GUARD: 0,
  HUNTER: 1,
  SEER: 1,
  VILLAGER: 2,
  WEREWOLF: 3,
  WITCH: 1,
});

export function setCharacter(
  character: SetableCharacters,
  type: 1 | -1
): boolean | void {
  if (characters[character] + type < 0) return false;
  if (["SEER", "HUNTER", "GUARD", "WITCH"].includes(character)) {
    if (type === 1 && characters[character] === 1) return false;
  }
  characters[character] += type;
  return true;
}

export const nickname = ref<string>("");
export const password = ref<string>("");

export async function create() {
  let characterNames: SetableCharacters[] = [];
  Object.keys(characters).map((_name) => {
    const name = _name as SetableCharacters;
    characterNames = characterNames.concat(
      new Array(characters[name]).fill(name)
    );
  });

  await createRoom({
    characters: characterNames,
    name: nickname.value,
    password: password.value ? sha256(password.value) : undefined,
  });
}
