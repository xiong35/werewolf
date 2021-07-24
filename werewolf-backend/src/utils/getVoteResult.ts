import { index } from "../../../werewolf-frontend/shared/ModelDefs";

/**
 * @param votes 投票结果的数组, 每一项是某个玩家投票的玩家编号
 * @returns 票数最多的几个玩家的编号, 全 undefined 返回 null
 */
export function getVoteResult(votes: Vote[]): index[] | null {
  const voteSituation = getVoteSituation(votes);
  /** 所有被投过的人 */
  const allTargets = Object.keys(voteSituation);
  if (
    !allTargets ||
    (allTargets.length === 1 && allTargets[0] === "0")
  )
    return null; // 全员弃票则返回 null

  let maxVoteTargets: index[] = [];
  let maxVoteCount = -Infinity;

  Object.entries(voteSituation).forEach(([target, voters]) => {
    if (target === "0") return; // 不考虑弃票的
    if (voters.length < maxVoteCount) return;
    // 如果这个人票数较少就不考虑了
    else if (voters.length === maxVoteCount) {
      // 如果平票, 加入 targets 中
      maxVoteTargets.push(Number(target));
    } else {
      // 如果现在的是最高票, 设置相关数据
      maxVoteCount = voters.length;
      maxVoteTargets = [Number(target)];
    }
  });

  return maxVoteTargets;
}

/**
 * 返回票型, key 投票的*目标*, value 为投给这个玩家的人
 * 选择弃票的玩家的*目标*为 0
 * @param votes 所有人投票的结果
 */
export function getVoteSituation(
  votes: Vote[]
): VoteSituationRecord {
  const voteSituation: VoteSituationRecord = {};

  votes.forEach((v) => {
    if (!v.voteAt) v.voteAt = 0;

    voteSituation[v.voteAt] = voteSituation[v.voteAt] || [];
    voteSituation[v.voteAt].push(v.from);
  });

  return voteSituation;
}

export interface Vote {
  from: index;
  /** 弃票则为 falsy 值 */
  voteAt: index;
}

/** key 投票的*目标*, value 为投给这个玩家的人 */
type VoteSituationRecord = Record<index, index[]>;
