module.exports = () => {
  return async function currentUser(ctx, next) {
    const token = ctx.header.token
		const  {gt, lte, ne, in: opIn} = ctx.app.Sequelize.Op;
		const session = await ctx.model.UserSession.findOne({
			where: {
				token: token,
				expire_at: {
					[gt]: new Date()
				}
			}
		});

		if (session) {
			const user = await session.getUser({
				attributes: ['id', 'name', 'avatar_url', 'role']
			})
			ctx.currentUser = user
		} else {
			ctx.currentUser = undefined
		}

    await next();
  };
};
