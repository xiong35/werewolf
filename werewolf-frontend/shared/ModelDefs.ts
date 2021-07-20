import { Character, GameStatus, Potion } from "./GameDefs";

export type ID = string; // 玩家 id
export type index = number; // 玩家编号, 从1开始

export type day = number; // 第0夜: 0, 第 n 天白天: 2n-1, 第 n 天晚上: 2n

export interface RoomDef {
  roomNumber: string; // 房间号码, 6 位数字
  creatorID: ID; // 创建者 ID
  players: PlayerDef[]; // 参与者
  password?: string; // 是否设置密码, 存放哈希过的密码
  currentDay: day; // 当前天数 -> 游戏结束重置
  needingCharacters: Character[]; // 设置的角色
  remainingIndexes: index[]; // 空缺的玩家号码
  isFinished: boolean; // 是否已结束 -> 游戏结束重置
  gameStatus: GameStatus[]; // 所有的游戏状态的栈 -> 游戏结束重置
  toFinishPlayers: Set<index>; // 选择结束当前阶段的玩家(每次改变状态需重置)
  timer: NodeJS.Timeout; // 事件定时器 id, undefined 则为结束
}

export interface PublicPlayerDef {
  index: index; // 玩家编号 -> 游戏结束重置
  name: string; // 昵称
  isAlive: boolean; // 是否存活 -> 游戏结束重置
  // 此状态不代表实际存活状态, 仅代表公开的存活信息
  // 如, 晚上有角色被杀了, 但是只有
  isSheriff: boolean; // 是否为警长 -> 游戏结束重置
  isDying: boolean; // 是否正在进行死亡结算
}

export interface PlayerDef extends PublicPlayerDef {
  character: Character; // 游戏角色 -> 游戏结束重置
  characterStatus?: CharacterStatus; // 允许自定义 -> 游戏结束重置
  die?: {
    // 具体死亡信息 -> 游戏结束重置
    at: day; // 第几天死的
    fromIndex: index[]; // 被哪些人杀死的(名字)
    fromCharacter: Character; // 被哪个角色杀死的
  };
  hasVotedAt: index[]; // 下标是天数, value 是投给了谁
  // 包括 狼人杀人 / 白天投票
  sheriffVotes: index[]; // 下标是天数, 包括上警(index=0)和白天传警徽 -> 游戏结束重置
  _id: ID; // string + 时间戳 的 token
  canBeVoted: boolean; // 是否能在当前阶段被投票
}

export interface TokenDef {
  ID: ID;
  datetime: number;
  roomNumber: string;
}

export interface HunterStatus {
  shootAt: {
    day: day;
    player: index;
  };
}

export interface GuardStatus {
  protects: index[];
}

export interface SeerStatus {
  checks: {
    index: index;
    isWerewolf: boolean;
  }[];
}

export interface WerewolfStatus {
  wantToKills: index[];
}

interface PotionStatus {
  usedDay: day;
  usedAt: index;
}

export type WitchStatus = Record<Potion, PotionStatus>;

export type CharacterStatus = Partial<
  HunterStatus &
    GuardStatus &
    SeerStatus &
    WerewolfStatus &
    WitchStatus
>;

export interface CharacterEvent {
  character: Character;
  events: {
    at: day;
    deed: string;
  }[];
}

export type GameEvent = {
  character: Character;
  at: day;
  deed: string;
};

// TODO add vote event
