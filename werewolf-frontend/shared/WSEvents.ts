export enum Events {
  /** 房间相关 */
  ROOM_EXILE = "ROOM_EXILE", // 踢出房间
  ROOM_JOIN = "ROOM_JOIN", // 有人加入房间
  GAME_BEGIN = "GAME_BEGIN", // 开始游戏
  GAME_END = "GAME_END", // 结束游戏

  /** 游戏相关 */
  CHANGE_STATUS = "CHANGE_STATUS", // 设置游戏当前状态
  NOTICE_GET_STATUS = "NOTICE_GET_STATUS", // 自己请求角色信息 // TODO
  SHOW_MSG = "SHOW_MSG", // 后端推送给前端的消息
}
