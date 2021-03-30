import { ref } from "vue";
import * as sha256 from "sha256";

import { joinRoom } from "../http/room";
import { socket, Events } from "../http/_socket";
import { RoomJoinMsg } from "../../shared/WSMsg/RoomJoin";

import { showDialog } from "./dialog";
import { players } from "./players";

export const password = ref("");
export const roomNumber = ref("");
export const nickname = ref("");

export async function join() {
  if (!roomNumber.value) return showDialog("请填写房间号");
  if (!nickname.value) return showDialog("请填写昵称");

  await joinRoom({
    roomNumber: roomNumber.value,
    name: nickname.value,
    password: password.value ? sha256(password.value) : undefined,
  });
}

socket.on(Events.ROOM_JOIN, (msg: RoomJoinMsg) => {
  console.log(msg);

  players.value = msg;
});
