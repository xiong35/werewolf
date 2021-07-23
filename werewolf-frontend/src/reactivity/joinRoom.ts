import * as sha256 from "sha256";
import { ref } from "vue";

import { joinRoom } from "../http/room";
import router from "../router";
import { Events, joinRoom as joinRoomSocket } from "../socket";
import { getToken, setToken } from "../utils/token";
import { showDialog } from "./dialog";
import { needingCharacters } from "./game";

export const password = ref("");
export const roomNumber = ref("666666"); // # dev
export const nickname = ref(Math.random().toString().slice(2, 5)); // # dev

export async function join() {
  if (!roomNumber.value) return showDialog("请填写房间号");
  if (!nickname.value) return showDialog("请填写昵称");

  const res = await joinRoom({
    roomNumber: roomNumber.value,
    name: nickname.value,
    password: password.value ? sha256(password.value) : undefined,
  });

  if (res && res.status === 200) {
    /* 向后端 socket 注册加入房间 */
    joinRoomSocket(roomNumber.value);

    showDialog("成功加入房间!");
    needingCharacters.value = res.data.needingCharacters;
    router.push({
      name: "waitRoom",
      query: {
        pw: password.value,
        number: roomNumber.value,
      },
    });

    setToken(res.data.ID, roomNumber.value);
  }
}

export function gameBegin() {
  /* 清空以前的备忘录 */
  localStorage.removeItem("memo");
  showDialog("游戏开始, 天黑请闭眼👁️");
  setTimeout(() => {
    router.push({
      name: "play",
    });
  }, 500);
}
