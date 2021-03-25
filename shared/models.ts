type Token = string;
type ID = string | any;
type day = number; // 第一夜: 0, 第 n 天白天: 2n-1, 第 n 天晚上: 2n

enum Character {
  HUNTER = "HUNTER",
  WITCH = "WITCH",
  SEER = "SEER",
  GUARD = "GUARD",
  VILLAGER = "VILLAGER",
  WEREWOLF = "WEREWOLF",
  SHERIFF = "SHERIFF",
  HOST = "HOST",
}

interface roomModel {
  roomNumber: string; // 房间号码, 6 位数字
  creator: ID; // 创建者 ID
  password?: string; // 是否设置密码, 存放哈希过的密码
  playerIDs: ID[]; // 参与者 ID
  currentDay: day; // 当前天数 -> 游戏结束重置
  needingCharacters: Character[]; // 设置的角色
  remainingCharacters: Character[]; // 还需要的角色
  isFinished: boolean; // 是否已结束 -> 游戏结束重置
}

interface playerModel {
  index: number; // 玩家编号 -> 游戏结束重置
  name: string; // 昵称
  character: Character; // 游戏角色 -> 游戏结束重置
  characterStatus: any; // 允许自定义 -> 游戏结束重置
  isAlive: boolean; // 是否存活 -> 游戏结束重置
  isSheriff: boolean; // 是否为警长 -> 游戏结束重置
  die: {
    // 具体死亡信息 -> 游戏结束重置
    at: day; // 第几天死的
    fromName: string | string[]; // 被哪些人杀死的(名字)
    fromCharacter: Character; // 被哪个角色杀死的
  };
  hasVotedAt: ID[]; // index 是天数, value 是投给了谁 -> 游戏结束重置
  // 包括 狼人杀人 / 神职发动技能 / 白天投票
  SheriffVotes: ID[]; // index 是天数, 包括上警(index=0)和白天传警徽 -> 游戏结束重置
}
