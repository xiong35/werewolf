export enum Character {
  HUNTER = "HUNTER",
  WITCH = "WITCH",
  SEER = "SEER",
  GUARD = "GUARD",
  VILLAGER = "VILLAGER",
  WEREWOLF = "WEREWOLF",
  SHERIFF = "SHERIFF",
  HOST = "HOST",
}

export enum Potion {
  POISON = "POISON",
  MEDICINE = "MEDICINE",
}

/**
 * 当前是什么游戏阶段
 * // TODO 每个状态需要一个 http 请求来结束
 */
export enum GameState {
  /** 狼人杀人 */
  WOLF_KILL = "WOLF_KILL",

  /** 预言家验人 */
  SEER_CHECK = "SEER_CHECK",

  /** 女巫用药 */
  WITCH_ACT = "WITCH_ACT",

  /** 守卫保人 */
  GUARD_PROTECT = "GUARD_PROTECT",

  /** 猎人查看开枪状态 */
  HUNTER_CHECK = "HUNTER_CHECK",

  /** 上警 */
  SHERIFF_ELECT = "SHERIFF_ELECT",

  /** 警长竞选 */
  SHERIFF_VOTE = "SHERIFF_VOTE",

  /** 自由发言 */
  DAY_DISCUSS = "DAY_DISCUSS",

  /** 投票出人 */
  EXILE_VOTE = "EXILE_VOTE",

  /** 猎人开枪 */
  HUNTER_SHOOT = "HUNTER_SHOOT",

  /** 留遗言 */
  LEAVE_MSG = "LEAVE_MSG",
}

GameState[2];
