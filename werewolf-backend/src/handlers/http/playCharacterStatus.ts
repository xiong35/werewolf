import { Middleware } from "koa";
import { listAllOfNumber } from "../../models/RoomModel";
import Player from "../../models/PlayerModel";

import { CharacterStatusResponse } from "../../../../werewolf-frontend/shared/httpMsg/CharacterStatusMsg";

const characterStatus: Middleware = async (ctx, next) => {
  const token = ctx.get("Token");
  const roomNumber = ctx.get("RoomNumber");

  const curPlayer = await Player.findOne({ _id: token });

  const players = await listAllOfNumber(roomNumber);

  const ret: CharacterStatusResponse = {
    status: 200,
    msg: "ok",
    data: {
      curCharacter: curPlayer.character,
      curStatus: curPlayer.characterStatus,
      players,
    },
  };
  ctx.body = ret;
};

export default characterStatus;
