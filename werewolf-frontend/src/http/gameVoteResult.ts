import { VoteResultMsg } from "../../shared/httpMsg/VoteResult";
import { showVoteResult } from "../utils/showVoteResult";
import request from "./_request";

export async function getWolfKillVote(): Promise<VoteResultMsg | null> {
  const res = ((await request({
    url: "/game/vote/wolfKill",
    method: "GET",
  })) as unknown) as VoteResultMsg;

  if (!res || res.status !== 200) return null;

  showVoteResult(res);

  return res;
}
