import * as Router from "koa-router";

import roomCreate from "../handlers/roomCreate";
import roomJoin from "../handlers/roomJoin";

const roomRouter = new Router();

roomRouter.post("room create", "/create", roomCreate);
roomRouter.post("room join", "/join", roomJoin);

export default roomRouter;
