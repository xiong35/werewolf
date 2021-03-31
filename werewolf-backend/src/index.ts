import * as Koa from "koa";
import * as mongoose from "mongoose";
import * as KoaBody from "koa-body";
import * as cors from "@koa/cors";
import * as logger from "koa-logger";
import { createServer } from "http";
import { Server } from "socket.io";

import { WS_PATH } from "../../werewolf-frontend/shared/constants";

import router from "./routes";
import useHandleError from "./middleware/handleError";
import { setup } from "./ws";

mongoose.connect("mongodb://localhost/werewolf", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = new Koa<
  { isKnownError: Boolean },
  { error: (status: number, msg: string) => void }
>();

const httpServer = createServer(app.callback());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  path: WS_PATH,
});

setup(io);

app
  .use(logger())

  .use(useHandleError())
  .use(
    cors({ credentials: true, origin: "http://localhost:3000" })
  )
  .use(KoaBody())

  .use(router.routes())
  .use(router.allowedMethods());

httpServer.listen(3030);

console.log("listen on 3030");

export default io;
