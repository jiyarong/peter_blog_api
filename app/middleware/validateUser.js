module.exports = () => {
  return async function validateUser(ctx, next) {
    if (ctx.currentUser === undefined) {
      ctx.status = 405
      ctx.body = {
        success: false,
        err: '认证失败'
      }
    } else {
      await next();
    }
  };
};
