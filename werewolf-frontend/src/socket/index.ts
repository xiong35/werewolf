import * as io from "socket.io-client";

import { SERVER_BASE_URL, WS_PATH } from "../../shared/constants";
import { Events } from "../../shared/WSEvents";
// handlers
import changeStatus from "./changeStatus";
import gameBegin from "./gameBegin";
import gameEnd from "./gameEnd";
import roomJoin from "./roomJoin";

const socket = io(SERVER_BASE_URL, {
  path: WS_PATH,
});

socket.on("connection", () => {
  console.log("#ws connected");
});

socket.on(Events.CHANGE_STATUS, changeStatus);
socket.on(Events.GAME_BEGIN, gameBegin);
socket.on(Events.GAME_END, gameEnd);
socket.on(Events.ROOM_JOIN, roomJoin);

export { socket, Events };
