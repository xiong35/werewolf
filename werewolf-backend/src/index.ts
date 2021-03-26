import * as Koa from "koa";
import * as mongoose from "mongoose";
import * as KoaBody from "koa-body";
import * as cors from "@koa/cors";

import router from "./routes";
import useHandleError from "./middleware/handleError";

mongoose.connect("mongodb://localhost/werewolf", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = new Koa<
  { isKnownError: Boolean },
  { error: (status: number, msg: string) => void }
>();

app
  .use(useHandleError())
  .use(cors())
  .use(KoaBody())

  .use(router.routes())
  .use(router.allowedMethods())

  .listen(3030);
