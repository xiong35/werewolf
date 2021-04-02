export type SetableCharacters =
  | "HUNTER"
  | "WITCH"
  | "SEER"
  | "GUARD"
  | "VILLAGER"
  | "WEREWOLF";

export type Character =
  | SetableCharacters
  | "SHERIFF"
  | "HOST"
  | "";

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
  "": "",
};

export const CharacterIntro: Record<Character, string> = {
  HUNTER:
    "你在死亡后可以选择开枪杀死任意一名玩家，但若是被女巫毒死则无法使用此技能。每晚你会醒来查看自己的开枪状态。",
  GUARD:
    "你每晚可以保护一名角色（包括自己）不被狼人伤害，但不能连续两天守护同一个人。若你守护的人同时被女巫施用了灵药，他还是会死亡。",
  HOST: "主持人",
  SEER: "每晚可以查验一名角色是否为狼人。",
  SHERIFF:
    "在白天的放逐投票中，你选择的人将获得 1.5 票。在你死后，可以选择指派任意玩家继任警长，也可以销毁警徽（如果这么做，村庄将再也不会有警长了）。",
  VILLAGER:
    "你是一名普通村民，没有特殊能力，但可以发挥你的推理，找出狼人！",
  WEREWOLF:
    "你是一个狼人，每晚你将和同伴一起苏醒，投票选择一名玩家将其杀害。你的目标是杀死所有非狼人角色！",
  WITCH:
    "你有两瓶药。第一瓶是灵药，当你未使用过它时，每晚你都将察觉到谁被狼人杀害了，你可以使用灵药来救活他；第二瓶是毒药，你可以使用它杀死任意一名玩家。游戏中，灵药毒药各只能使用一次。每晚你最多只能使用一瓶药。只有第一晚你可以使用灵药救自己。",
  "": "",
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
