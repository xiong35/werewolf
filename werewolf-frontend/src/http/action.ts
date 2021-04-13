import request from "./_request";

import CharacterAct from "../../shared/httpMsg/CharacterAct";

export async function characterAct(
  data: CharacterAct
): Promise<unknown> {
  const res = await request({
    url: "/game/act",
    method: "POST",
    data,
  });

  return res;
}
