import { RoomJoinMsg } from "../../shared/WSMsg/RoomJoin";

import { players } from "../reactivity/players";

export default function roomJoin(msg: RoomJoinMsg) {
  console.log("#ws on room join");

  players.value = msg;
}
