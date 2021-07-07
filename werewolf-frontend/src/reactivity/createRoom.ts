import * as sha256 from "sha256";
import { reactive, ref } from "vue";

import { SetableCharacters } from "../../shared/GameDefs";
import { createRoom } from "../http/room";
import router from "../router";
import { Events, socket } from "../socket";
import { setToken } from "../utils/token";
import { showDialog } from "./dialog";
import { needingCharacters, players } from "./game";

/**
 * 游戏人数配置(reactive)
 */
export const characters = reactive<
  Record<SetableCharacters, number>
>({
  GUARD: 0,
  HUNTER: 0,
  SEER: 1,
  VILLAGER: 0,
  WEREWOLF: 1,
  WITCH: 0, // # dev
  // GUARD: 0,
  // HUNTER: 1,
  // SEER: 1,
  // VILLAGER: 2,
  // WEREWOLF: 3,
  // WITCH: 1,
});

/**
 * 设置游戏人数配置
 * @param character 设置的对象
 * @param type 设置增大还是减小
 * @returns {boolean} 是否设置成功
 */
export function setCharacter(
  character: SetableCharacters,
  type: 1 | -1
): boolean {
  if (characters[character] + type < 0) return false;
  if (["SEER", "HUNTER", "GUARD", "WITCH"].includes(character)) {
    if (type === 1 && characters[character] === 1) return false;
  }
  characters[character] += type;
  return true;
}

/* 玩家信息 */
export const nickname = ref<string>("123"); // # dev
export const password = ref<string>("");

export async function create() {
  if (!nickname.value) return showDialog("请填写昵称");

  /* 设置人数配置 */
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

  if (res && res.status === 200) {
    const data = res.data;
    /* 通知后端, 在 io 中加入该房间 */
    socket.emit(Events.ROOM_JOIN, data.roomNumber);

    showDialog("创建成功, 进入等待房间");
    router.push({
      name: "waitRoom",
      query: {
        pw: password.value,
        number: data.roomNumber,
      },
    });
    setToken(data.ID, data.roomNumber);
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
