import { HttpRes } from "../../shared/httpMsg/_httpResTemplate";
import CharacterAct from "../../shared/httpMsg/CharacterAct";
import { SeerCheckData } from "../../shared/httpMsg/SeerCheckMsg";
import request from "./_request";

export async function characterAct(
  data: CharacterAct
): Promise<HttpRes<Partial<SeerCheckData>>> {
  const res = await request({
    url: "/game/act",
    method: "POST",
    data,
  });

  return res;
}
