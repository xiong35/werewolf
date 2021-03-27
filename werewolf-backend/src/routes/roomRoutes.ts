import * as Router from "koa-router";

import roomCreate from "../handlers/http/roomCreate";
import roomJoin from "../handlers/http/roomJoin";

const roomRouter = new Router();

roomRouter.post("room create", "/create", roomCreate);
roomRouter.post("room join", "/join", roomJoin);

export default roomRouter;
