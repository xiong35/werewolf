import { VoteResultMsg } from "../../shared/httpMsg/VoteResult";
import request from "./_request";

export async function getWolfKillVote(): Promise<VoteResultMsg | null> {
  const res = (await request({
    url: "/game/vote/wolfKill",
    method: "GET",
  })) as unknown;

  return res as VoteResultMsg;
}
