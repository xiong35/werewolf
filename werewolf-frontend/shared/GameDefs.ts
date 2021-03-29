export type SetableCharacters =
  | "HUNTER"
  | "WITCH"
  | "SEER"
  | "GUARD"
  | "VILLAGER"
  | "WEREWOLF";

export type Character = SetableCharacters | "SHERIFF" | "HOST";

export enum Potion {
  POISON = "POISON",
  MEDICINE = "MEDICINE",
}

export const ChineseNames: Record<Character, string> = {
  HUNTER: "猎人",
  GUARD: "守卫",
  HOST: "主持人",
  SEER: "预言家",
  SHERIFF: "警长",
  VILLAGER: "村民",
  WEREWOLF: "狼人",
  WITCH: "女巫",
};

/**
 * 当前是什么游戏阶段
 * // TODO 每个状态需要一个 http 请求来结束
 */
export enum GameState {
  /**
   * 狼人杀人
   * 预言家验人入栈
   */
  WOLF_KILL = "狼人杀人",

  /**
   * 预言家验人
   * 女巫用药 入栈
   */
  SEER_CHECK = "预言家验人",

  /**
   * 女巫用药
   * 守卫保人 入栈
   */
  WITCH_ACT = "女巫用药",

  /**
   * 守卫保人
   * 猎人查看开枪状态 入栈
   */
  GUARD_PROTECT = "守卫保人",

  /**
   * 猎人查看开枪状态
   * 自由发言或上警 入栈
   */
  HUNTER_CHECK = "猎人查看开枪状态",

  /**
   * 上警
   * 投票选警长 入栈
   */
  SHERIFF_ELECT = "上警",

  /**
   * 投票选警长
   * - 自由发言, 指派警长 入栈
   * - 平票: 投票选警长 入栈
   */
  SHERIFF_VOTE = "投票选警长",

  /**
   * 指派警长，
   * 指当前警长去世了, 指定新的警长
   *
   * 老警长 10s 选择，
   * 选择后 10s 时间确认
   */
  SHERIFF_ASSIGN = "指派警长",

  /**
   * 自由发言
   * - 投票出人 入栈
   * - 如果猎人死了, 猎人开枪入栈
   */
  DAY_DISCUSS = "自由发言",

  /**
   * 投票出人
   * - 猎人死了: 开枪入栈
   * - 警长死了: 指派警长入栈
   * - 平票: 投票出人入栈
   *
   * 狼人杀人 入栈
   */
  EXILE_VOTE = "投票出人",

  /**
   * 猎人开枪
   * 可能有留遗言入栈
   */
  HUNTER_SHOOT = "猎人开枪",

  /** 留遗言 */
  LEAVE_MSG = "留遗言",
}
