import { Socket, Server } from "socket.io";
import * as Koa from "koa";
import { createServer } from "http";

import { Events } from "../../werewolf-frontend/shared/WSEvents";

const app = new Koa();

app.use(async (ctx, next) => {
  await next();

  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

const httpServer = createServer(app.callback());

const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
  },
  path: "/werewolf-api",
});

io.on("connection", (socket: Socket) => {
  console.log("connected");

  socket.send({ result: "result" });
  socket.emit("serverUpgrade", {
    result: "result",
    type: "upgrade",
  });

  socket.on(Events.EXILE, (...args) => {
    console.log(args);
  });
});

httpServer.listen(3030);
