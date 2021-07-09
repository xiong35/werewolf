import io from "src";
import { Player } from "src/models/PlayerModel";
import { Room } from "src/models/RoomModel";
import { renderHintNPlayers } from "src/utils/renderHintNplayers";

import { Character, GameStatus } from "../../../../../werewolf-frontend/shared/GameDefs";
import { index } from "../../../../../werewolf-frontend/shared/ModelDefs";
import { Events } from "../../../../../werewolf-frontend/shared/WSEvents";
import { ShowMsg } from "../../../../../werewolf-frontend/shared/WSMsg/ShowMsg";

/**
 * 根据现有房间状态判断下一游戏状态是什么, 若出现角色空缺则链式调用后续判断函数\
 * 调用此函数时所有状态均为最新状态
 */
export type GetNextState = (
  room: Room,
  extra?: unknown
) => GameStatus;

export const nextStateOfWolfKill: GetNextState = (room, extra) => {
  return GameStatus.WOLF_KILL_CHECK;
};

export const nextStateOfWolfKillCheck: GetNextState = (
  room,
  extra
) => {
  if (room.needingCharacters.includes("SEER"))
    return GameStatus.SEER_CHECK;

  return nextStateOfSeerCheck(room, extra);
};

export const nextStateOfSeerCheck: GetNextState = (
  room,
  extra
) => {
  if (room.needingCharacters.includes("WITCH"))
    return GameStatus.WITCH_ACT;

  return nextStateOfWitchAct(room, extra);
};

export const nextStateOfWitchAct: GetNextState = (room, extra) => {
  if (room.needingCharacters.includes("GUARD"))
    return GameStatus.GUARD_PROTECT;

  return nextStateOfGuardProtect(room, extra);
};

export const nextStateOfGuardProtect: GetNextState = (
  room,
  extra
) => {
  if (room.needingCharacters.includes("HUNTER"))
    return GameStatus.HUNTER_CHECK;

  return nextStateOfHunterCheck(room, extra);
};

export const nextStateOfHunterCheck: GetNextState = (
  room,
  extra
) => {
  // 当执行到这里的时候, 意味着下一个状态就是到白天了
  // 此时应该让天数加一
  room.currentDay++;

  if (room.currentDay === 1) {
    return GameStatus.SHERIFF_ELECT;
  }

  // 当执行到这里的时候, 意味着下一个状态就是
  // BEFORE_DAY_DISCUSS, 正准备开启他的定时器
  // 此时应该进行夜晚的结算并通知所有人获得晚上的消息了

  // 将夜晚死的人的 isAlive 设为false
  room.players
    .filter((p) => {
      const iaKilledLastNight = p.die?.at === room.currentDay - 1;
      return iaKilledLastNight;
    })
    .forEach((p) => (p.isAlive = false));

  // 将女巫救的人复活
  const medicineStatus = room.players.find(
    (p) => p.character === "WITCH"
  )?.characterStatus?.MEDICINE;
  if (medicineStatus?.usedAt === room.currentDay - 1) {
    // 如果女巫昨晚用了药
    const savedPlayerInd = medicineStatus.usedAt;
    const savedLastNight = room.getPlayerByIndex(savedPlayerInd);
    if (savedLastNight) savedLastNight.isAlive = true;
  }

  return GameStatus.BEFORE_DAY_DISCUSS;
};

/**
 * @param extra {Player[]} 参与竞选的人
 */
export const nextStateOfSheriffElect: GetNextState = (
  room,
  extra
) => {
  const electingPlayers = extra as Player[];
  if (!electingPlayers || electingPlayers.length === 0) {
    // 无人竞选就直接到天亮
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: "无人参与竞选",
    } as ShowMsg);
    return GameStatus.SHERIFF_VOTE_CHECK;
  } else if (electingPlayers.length === 1) {
    // 只有一人竞选就把警长给他
    electingPlayers[0].isSheriff = true;
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: renderHintNPlayers(
        "仅有此玩家参选, 直接成为警长",
        [electingPlayers[0].index]
      ),
    });
    // TODO 连续让前端显示文字, 后一次会覆盖前一次, 需要前端修改弹窗逻辑
    return GameStatus.SHERIFF_VOTE_CHECK;
  } else {
    // 有多人参选
    // 设置参选警长的人都未结束发言
    room.finishCurStatus = new Set();
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: renderHintNPlayers(
        "参选警长的玩家如下, 请依次进行发言",
        electingPlayers.map((p) => p.index)
      ),
    });
    return GameStatus.SHERIFF_SPEECH;
  }
};
/**
 * @param extra {index[]} 警长竞选投票中得票最多的几个人(可并列)
 */
export const nextStateOfSheriffVote: GetNextState = (
  room,
  extra
) => {
  const highestVotes = extra as index[];
  // 如果没有全部弃票
  if (!highestVotes || highestVotes.length === 0) {
    // 如果所有人都弃票
    // 直接进入白天
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: "所有人都弃票, 即将进入自由发言阶段",
    });
    return GameStatus.SHERIFF_VOTE_CHECK;
  } else if (highestVotes.length === 1) {
    // 如果有票数最高的人
    // 此人当选, 进入白天
    room.getPlayerByIndex(highestVotes[0]).isSheriff = true;
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: renderHintNPlayers(
        "当选警长的玩家为:",
        highestVotes
      ),
    });
    return GameStatus.SHERIFF_VOTE_CHECK;
  } else {
    // 如果多人平票
    // 设置参与警长竞选的人是他们几个
    room.players.forEach((p) => {
      if (p.index in highestVotes) p.isElecting = true;
      else p.isElecting = false;
    });
    // 设置他们未结束发言
    room.finishCurStatus = new Set();
    // 告知所有人现在应该再依次投票
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: renderHintNPlayers(
        "竞争警长的玩家如下, 请再次依次进行发言",
        highestVotes
      ),
    });
    // 设置下一阶段为警长发言
    return GameStatus.SHERIFF_SPEECH;
  }
};
export const nextStateOfSheriffVoteCheck: GetNextState = (
  room,
  extra
) => {
  // TODO 进行死亡结算
  const dieLastNight = room.players.filter(
    (p) => p.die?.at === room.currentDay - 1 && !p.isAlive // 昨晚死的且没被女巫救活的人
  );
  if (dieLastNight.length === 0) {
    // 平安夜
    io.to(room.roomNumber).emit(Events.SHOW_MSG, {
      innerHTML: "昨晚是个平安夜",
    } as ShowMsg);
  } else {
    room.players.forEach((p) => (p.isLeavingMsg = false)); //先把所有人置空
    dieLastNight.forEach((p) => (p.isLeavingMsg = true)); // 设置昨晚死的人正在留遗言

    if (room.currentDay === 1) {
      // 第一晚有遗言
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "以下为昨晚死亡的玩家, 请发表遗言",
          dieLastNight.map((p) => p.index)
        ),
      } as ShowMsg);
    } else {
      // 以后晚上死亡无遗言
      io.to(room.roomNumber).emit(Events.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "以下为昨晚死亡的玩家, 请发表遗言",
          dieLastNight.map((p) => p.index)
        ),
      } as ShowMsg);
    }
  }
  // TODO 设置结束发言的人为空
  // TODO 发送消息通知大家谁死了, 并依次发表遗言
  return GameStatus.BEFORE_DAY_DISCUSS;
};
export const nextStateOfSheriffSpeech: GetNextState = (
  room,
  extra
) => {
  return GameStatus.SHERIFF_VOTE;
};

export const nextStateOfBeforeDayDiscuss: GetNextState = (
  room,
  extra
) => {
  return GameStatus.DAY_DISCUSS;
};

export const nextStateOfDayDiscuss: GetNextState = (
  room,
  extra
) => {
  return GameStatus.EXILE_VOTE;
};
export const nextStateOfExileVote: GetNextState = (
  room,
  extra
) => {
  return GameStatus.EXILE_VOTE_CHECK;
};
export const nextStateOfExileVoteCheck: GetNextState = (
  room,
  extra
) => {
  // TODO 判断谁死了
  // TODO 天数++

  return GameStatus.WOLF_KILL;
};

export const nextStateOfLeaveMsg: GetNextState = (room, extra) => {
  // TODO 通过参数指示下一个状态是什么?
  // TODO 天数++

  return GameStatus.WOLF_KILL;
};
