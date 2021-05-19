import { index } from "../../../werewolf-frontend/shared/ModelDefs";

export function getToDieFromVotes(votes: index[]): index {
  return votes
    .reduce<number[]>((prev, index) => {
      if (index == 0) index = 0;
      if (prev[index] === undefined) prev[index] = 0;
      prev[index]++;
      return prev;
    }, []) // 返回投票结果数组, index 为玩家号, value 为票数
    .reduce((maxInd, cur, index, arr) => {
      if (index === 0) return maxInd;
      if (arr[maxInd] > cur) {
        return maxInd;
      } else {
        return index;
      }
    }, 1);
}
