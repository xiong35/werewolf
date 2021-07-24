import { index } from "../../shared/ModelDefs";

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
