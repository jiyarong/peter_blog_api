'use strict';

const Controller = require('./application');

class UserController extends Controller {
	// POST /api/users/register
	async register() {
		const { body } = this.ctx.request
		var user = this.ctx.model.User.build()
		const result = await user.register(body)
		if (result.success === true) {
			this.success(await this.loginSuccess(result.user))
		} else {
			this.error(result.errors)
		}
	}

	async login () {
		const { body } = this.ctx.request
		const user = await this.ctx.model.User.login(body.name, body.password)
		console.log(user)
		if (user != null) {
			return this.success(await this.loginSuccess(user))
		} else {
			this.error("密码错误!")
		}
	}
}

module.exports = UserController