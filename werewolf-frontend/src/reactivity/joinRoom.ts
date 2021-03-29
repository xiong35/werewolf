import { ref } from "vue";
import { joinRoom } from "../http/room";
import * as sha256 from "sha256";

import { showDialog } from "../reactivity/dialog";

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
