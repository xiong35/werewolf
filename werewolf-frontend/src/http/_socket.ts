import * as io from "socket.io-client";
import { SERVER_BASE_URL, WS_PATH } from "../../shared/constants";
import { Events } from "../../shared/WSEvents";

const socket = io(SERVER_BASE_URL, {
  path: WS_PATH,
});

socket.on("connection", () => {
  console.log("ws connected");
});

export { socket, Events };
