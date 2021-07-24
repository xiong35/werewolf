import { computed, ref, Ref, watchEffect } from "vue";

import { Character, GameStatus, TIMEOUT } from "../../shared/GameDefs";
import {
    CharacterStatus, day, GameEvent, PlayerDef, PublicPlayerDef
} from "../../shared/ModelDefs";
import { getGameStatus } from "../http/gameStatus";

/** 玩家的公开信息 */
export const players: Ref<PublicPlayerDef[]> = ref([]);
/** 角色配置 */
export const needingCharacters = ref<Character[]>([]);
/** 自己的详细状态 */
export const self = ref<PlayerDef>({
  _id: "",
  character: "",
  hasVotedAt: [],
  index: 0,
  isAlive: false,
  isSheriff: false,
  name: "---",
  sheriffVotes: [],
  canBeVoted: false,
  isDying: false,
});
/** 自己的角色 */
export const character = computed(() =>
  self.value ? self.value.character : ""
);
/** 天数 */
export const date = ref<day>(-1);
/** 当前游戏进程 */
export const gameStatus = ref<GameStatus>(GameStatus.WOLF_KILL);
/** 当前状态还有多结束 */
export const gameStatusTimeLeft = ref(
  TIMEOUT[GameStatus.WOLF_KILL]
);
/**
 * gameStatus 被修改时调用, 改变 ui 状态, 弹出提示等
 */

/**
 * 获得最新的游戏信息
 */
export async function refresh() {
  const data = await getGameStatus({});
  if (!data) return;

  date.value = data.curDay;
  gameStatus.value = data.gameStatus;
  players.value = data.players;
  self.value = data.self;
}
