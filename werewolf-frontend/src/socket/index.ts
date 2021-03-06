import io from "socket.io-client";

// const io = require("socket.io-client");
import { SERVER_DOMAIN, WS_PATH } from "../../shared/constants";
import { Events } from "../../shared/WSEvents";
// handlers
import changeStatus from "./changeStatus";
import gameBegin from "./gameBegin";
import gameEnd from "./gameEnd";
import roomJoin from "./roomJoin";
import showWSMsg from "./showWSMsg";

let socket: SocketIOClient.Socket;

function joinRoom(roomNumber: string) {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  socket = io(SERVER_DOMAIN, {
    path: WS_PATH,
  });
  socket.on("connection", () => {
    // console.log("#ws connected");
  });

  socket.on(Events.CHANGE_STATUS, changeStatus);
  socket.on(Events.GAME_BEGIN, gameBegin);
  socket.on(Events.GAME_END, gameEnd);
  socket.on(Events.ROOM_JOIN, roomJoin);
  socket.on(Events.SHOW_MSG, showWSMsg);

  socket.emit(Events.ROOM_JOIN, roomNumber);
}

export { joinRoom, Events, socket };
