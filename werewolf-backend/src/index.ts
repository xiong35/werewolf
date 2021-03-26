import * as Koa from "koa";
import * as mongoose from "mongoose";
import * as KoaBody from "koa-body";
import * as cors from "@koa/cors";

import router from "./routes";

mongoose.connect("mongodb://localhost/werewolf", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = new Koa();

app
  .use(cors())
  .use(KoaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3030);
