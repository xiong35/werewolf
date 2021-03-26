import { Middleware } from "koa";

const handleError: Middleware = async (ctx, next) => {
  ctx.error = (status, msg) => {
    ctx.status = status;
    ctx.state.isKnownError = true;
    throw new Error(msg);
  };

  try {
    await next();
  } catch (err) {
    const { isKnownError } = ctx.state;
    ctx.body = {
      status: isKnownError ? ctx.status : 500,
      msg: isKnownError ? err.message : "服务器出了点错误呢QwQ",
      data: {},
    };
    if (!isKnownError) {
      console.error(err);
    }
  } finally {
    ctx.status = 200;
  }
};

export default handleError;
