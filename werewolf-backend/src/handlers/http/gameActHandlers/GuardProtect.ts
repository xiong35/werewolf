import { ActHandler } from ".";

export const GuardProtectHandler: ActHandler = async (
  room,
  player,
  target,
  ctx
) => {
  return {
    status: 200,
    msg: "ok",
    data: {},
  };
};
