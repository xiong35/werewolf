import { ref } from "vue";
import * as sha256 from "sha256";

import { joinRoom } from "../http/room";
import { socket, Events } from "../socket";
import router from "../router";
import { showDialog } from "./dialog";
import { getToken, setToken } from "../utils/token";
import { needingCharacters } from "./game";

export const password = ref("");
export const roomNumber = ref("");
export const nickname = ref("");

export async function join() {
  if (!roomNumber.value) return showDialog("请填写房间号");
  if (!nickname.value) return showDialog("请填写昵称");

  const res = await joinRoom({
    roomNumber: roomNumber.value,
    name: nickname.value,
    password: password.value ? sha256(password.value) : undefined,
  });

  if (res.status === 200) {
    if (res.data.open) {
      gameBegin();
    } else {
      socket.emit(Events.ROOM_JOIN, roomNumber.value);
      showDialog("成功加入房间!");
      needingCharacters.value = res.data.needingCharacters;
      router.push({
        name: "waitRoom",
        query: {
          pw: password.value,
          number: roomNumber.value,
        },
      });
    }
    setToken(res.data.ID, roomNumber.value);
  }
}

export function gameBegin() {
  localStorage.removeItem("memo");
  showDialog("游戏开始, 天黑请闭眼👁️");
  setTimeout(() => {
    router.push({
      name: "play",
    });
  }, 500);
}
