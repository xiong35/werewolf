import { ActHandler } from ".";

export const WitchActHandler: ActHandler = async (
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
