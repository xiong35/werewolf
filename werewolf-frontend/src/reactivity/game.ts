import { computed, ref, Ref, watchEffect } from "vue";

import { Character, GameStatus } from "../../shared/GameDefs";
import {
    CharacterStatus, day, GameEvent, PlayerDef, PublicPlayerDef
} from "../../shared/ModelDefs";
import { getGameStatus } from "../http/gameStatus";
import { checkStatus } from "../utils/checkStatus";

/** 玩家的公开信息 */
export const players: Ref<PublicPlayerDef[]> = ref([]);
/** 角色配置 */
export const needingCharacters = ref<Character[]>([]);
/** 自己的详细状态 */
export const self = ref<PlayerDef | null>();
/** 自己的角色 */
export const character = computed(() =>
  self.value ? self.value.character : ""
);
/** 天数 */
export const date = ref<day>(-1);
/** 事件表 */
export const gameEvents = ref<GameEvent[]>([]);
/** 当前游戏进程 */
export const gameStatus = ref<GameStatus>(GameStatus.WOLF_KILL);
/**
 * trigger when gameStatus is set
 * 展示"你可以行动了"
 */
watchEffect(checkStatus); //

/**
 * 获得最新的游戏信息
 */
export async function refresh() {
  const { data } = (await getGameStatus({})) || {};
  if (!data) return;

  date.value = data.curDay;
  gameEvents.value = data.events;
  gameStatus.value = data.gameStatus;
  players.value = data.players;
  self.value = data.self;
}
