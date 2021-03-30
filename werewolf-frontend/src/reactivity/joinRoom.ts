import { ref } from "vue";
import { Router } from "vue-router";
import * as sha256 from "sha256";

import { joinRoom } from "../http/room";
import { socket, Events } from "../http/_socket";
import { RoomJoinMsg } from "../../shared/WSMsg/RoomJoin";

import { showDialog } from "./dialog";
import { players } from "./players";

export const password = ref("");
export const roomNumber = ref("");
export const nickname = ref("");

export async function join(router: Router) {
  if (!roomNumber.value) return showDialog("请填写房间号");
  if (!nickname.value) return showDialog("请填写昵称");

  const res = await joinRoom({
    roomNumber: roomNumber.value,
    name: nickname.value,
    password: password.value ? sha256(password.value) : undefined,
  });

  if (res.status === 200) {
    showDialog("成功加入房间!");
    router.push({
      name: "waitRoom",
      query: {
        pw: password.value,
        number: roomNumber.value,
      },
    });
  }
}

socket.on(Events.ROOM_JOIN, (msg: RoomJoinMsg) => {
  console.log(msg);

  players.value = msg;
});
