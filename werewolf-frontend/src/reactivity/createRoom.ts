import { reactive, ref } from "vue";
import * as sha256 from "sha256";
import { Router } from "vue-router";

import { createRoom } from "../http/room";
import { SetableCharacters } from "../../shared/GameDefs";

import { players, needingCharacters } from "./players";
import { showDialog } from "./dialog";

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

export async function create(router: Router) {
  if (!nickname.value) return showDialog("请填写昵称");

  let characterNames: SetableCharacters[] = [];
  Object.keys(characters).map((_name) => {
    const name = _name as SetableCharacters;
    characterNames = characterNames.concat(
      new Array(characters[name]).fill(name)
    );
  });

  needingCharacters.value = characterNames;

  const res = await createRoom({
    characters: characterNames,
    name: nickname.value,
    password: password.value ? sha256(password.value) : undefined,
  });

  if (res?.status === 200) {
    const data = res.data;

    showDialog("创建成功, 进入等待房间");
    router.push({
      name: "waitRoom",
      query: {
        pw: password.value,
        number: data.roomNumber,
      },
    });

    players.value = [
      {
        index: 1,
        isAlive: true,
        name: nickname.value,
        isSheriff: false,
      },
    ];
  }
}
