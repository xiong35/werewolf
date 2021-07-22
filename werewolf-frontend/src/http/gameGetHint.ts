import { showDialog } from "../reactivity/dialog";
import request from "./_request";

/**
 * 获得狼人杀人结果并显示弹窗
 * @returns 是否成功
 */
export async function getWolfKillResNShow(): Promise<boolean> {
  const res = await request<string>({
    url: "/game/hint/wolfKill",
    method: "GET",
  });

  if (!res || res.status !== 200) return false;

  showDialog(res.data);

  return true;
}

/**
 * 女巫获得狼人杀人结果并显示弹窗
 * @returns 是否成功
 */
export async function witchGetDieNShow(): Promise<boolean> {
  const res = await request<string>({
    url: "/game/hint/witchGetDie",
    method: "GET",
  });

  if (!res || res.status !== 200) return false;

  showDialog(res.data);

  return true;
}
