/* 将游戏记录存在 localStorage 的相关操作 */

import { onMounted, ref, Ref } from "vue";

import { Character } from "../../shared/GameDefs";
import { GameEvent, index, PlayerDef, PublicPlayerDef } from "../../shared/ModelDefs";

const ROOM_NUMBER_PREFIX = "WERE_WOLF_ROOM";
interface RoomRecord extends RoomRecordBrief {
  groupedGameEvents: GameEvent[][]; // 按天数归类的对局信息
  playerBriefs: {
    name: string;
    index: index;
    character: Character;
  }[];
  selfIndex: index;
}

const ROOM_LIST_KEY = "WERE_WOLF_ROOMS";
interface RoomRecordBrief {
  time: number; // 游戏结束时的时间戳
  roomNumber: string;
}

function getKeyByNumberNTime(
  roomNumber: string,
  time: number
): string {
  return `${ROOM_NUMBER_PREFIX}-${roomNumber}-${time}`;
}

export function saveRecord(
  groupedGameEvents: GameEvent[][],
  roomNumber: string,
  self: PlayerDef,
  players: PlayerDef[],
  time: number
) {
  const recordBrief: RoomRecordBrief = {
    roomNumber,
    time,
  };
  const record: RoomRecord = {
    groupedGameEvents,
    playerBriefs: players.map((p) => ({
      name: p.name,
      index: p.index,
      character: p.character,
    })),
    selfIndex: self.index,
    ...recordBrief,
  };
  localStorage.setItem(
    getKeyByNumberNTime(roomNumber, time),
    JSON.stringify(record)
  );

  const prevRoomListStr =
    localStorage.getItem(ROOM_LIST_KEY) || "[]";
  const roomList = JSON.parse(
    prevRoomListStr
  ) as RoomRecordBrief[];
  roomList.push(recordBrief);

  localStorage.setItem(ROOM_LIST_KEY, JSON.stringify(roomList));
}

function getAllRecords(): RoomRecordBrief[] {
  const prevRoomListStr =
    localStorage.getItem(ROOM_LIST_KEY) || "[]";
  return JSON.parse(prevRoomListStr) as RoomRecordBrief[];
}

export function useAllRecords(): Ref<RoomRecordBrief[]> {
  const records = ref([]) as Ref<RoomRecordBrief[]>;
  onMounted(() => {
    records.value = getAllRecords();
  });

  return records;
}

function getRecordByNumberNTime(
  roomNumber: string,
  time: number
): RoomRecord | null {
  const key = getKeyByNumberNTime(roomNumber, time);

  const recordStr = localStorage.getItem(key);

  if (!recordStr) return null;

  return JSON.parse(recordStr) as RoomRecord;
}

export function useRecord(roomNumber: string, time: number) {
  const record = ref(null) as Ref<RoomRecord | null>;

  onMounted(() => {
    record.value = getRecordByNumberNTime(roomNumber, time);
  });

  return record;
}

// TODO 加入摘要防止篡改localstorage?
// TODO try JSON.parse
