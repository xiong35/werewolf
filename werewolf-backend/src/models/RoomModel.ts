import { createError } from "src/middleware/handleError";

import { Character, GameStatus } from "../../../werewolf-frontend/shared/GameDefs";
import {
    day, ID, index, PlayerDef, PublicPlayerDef, RoomDef
} from "../../../werewolf-frontend/shared/ModelDefs";
import { Player } from "./PlayerModel";

export class Room implements RoomDef {
  roomNumber: string;
  creatorID: ID;
  players: Player[];
  password?: string;
  currentDay: day = -1; // 狼人杀人时会 ++
  needingCharacters: Character[];
  remainingIndexes: index[];
  isFinished = false;
  gameStatus: GameStatus[] = [GameStatus.WOLF_KILL];
  get curStatus(): GameStatus {
    return this.gameStatus[this.gameStatus.length - 1];
  }
  toFinishPlayers = new Set<index>();
  timer: NodeJS.Timeout;
  /** 死亡结算后的下一个状态 */
  nextStateOfDieCheck: GameStatus;
  /** 当前正在进行死亡结算的玩家序号 */
  curDyingPlayer: Player;

  createdAt = new Date();

  private static roomMap: Record<string, Room> = {};

  constructor({
    creator,
    needingCharacters,
    password,
  }: {
    creator: Player;
    needingCharacters: Character[];
    password?: string;
  }) {
    // TODO 检查创建房间的人数配比
    while (true) {
      // const roomNumber = Math.random().toString().slice(2, 8);
      const roomNumber = "666666"; // # dev
      const prevRoom = Room.roomMap[roomNumber];
      if (
        prevRoom &&
        Date.now() - prevRoom.createdAt.getTime() <
          1000 * 3600 * 24
      ) {
        continue;
      } else {
        this.roomNumber = roomNumber;
        Room.roomMap[this.roomNumber] = this;
        break;
      }
    }
    this.creatorID = creator._id;
    this.players = [creator];
    this.needingCharacters = needingCharacters; // default index=1
    this.remainingIndexes = new Array(needingCharacters.length - 1)
      .fill(0)
      .map((_, i) => i + 2);
    this.password = password;
  }

  playerJoin(name: string, password?: string): Player {
    const nameReg = /^.{1,15}$/;
    if (!nameReg.test(name))
      return createError({ status: 401, msg: "昵称不合法" });
    if (this.password && this.password !== password) {
      return createError({ status: 401, msg: "密码错误" });
    }
    if (this.remainingIndexes.length === 0) {
      return createError({ status: 401, msg: "房间已满" });
    }

    const index = this.remainingIndexes.shift(); // assign smallest index
    const player = new Player({ name, index });

    this.players.push(player);

    return player;
  }

  choosePublicInfo(): PublicPlayerDef[] {
    return this.players
      .map((p) => p.getPublic())
      .sort((a, b) => a.index - b.index);
  }

  getPlayerById(id: string): Player {
    const player = this.players.find((p) => p._id === id);
    if (!player)
      return createError({ status: 401, msg: "id 错误" });
    return player;
  }
  getPlayerByIndex(index: index): Player {
    const player = this.players.find((p) => p.index === index);
    if (!player)
      return createError({ status: 401, msg: "编号错误" });
    return player;
  }

  static getRoom(number: string): Room {
    const room = Room.roomMap[number];
    // console.log("# RoomModel", { room });
    if (!room)
      return createError({ status: 400, msg: "未找到房间号" });
    return room;
  }
}
