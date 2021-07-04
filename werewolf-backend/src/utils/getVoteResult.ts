import { index } from "../../../werewolf-frontend/shared/ModelDefs";

/**
 * @param votes 投票结果的数组, 每一项是某个玩家投票的玩家编号
 * @returns 票数最多的几个玩家的编号, 全 undefined 返回 null
 */
export function getVoteResult(votes: index[]): index[] | null {
  votes = votes.filter((v) => v != 0); // 滤掉弃票的
  if (votes.length === 0) return null; // 全员弃票则返回 null

  const index2VoteNum = votes.reduce<Record<index, number>>(
    (prev, index) => {
      if (prev[index] === undefined) prev[index] = 0;
      prev[index]++;
      return prev;
    },
    {}
  ); // 返回投票结果 map, key 为玩家号, value 为票数

  const maxVote = Math.max(...Object.values(index2VoteNum));

  return Object.entries(index2VoteNum).reduce<index[]>(
    (prev, [index, voteNum]) =>
      voteNum === maxVote ? [...prev, Number(index)] : prev, // 返回最大票数的几个人
    []
  );
}
