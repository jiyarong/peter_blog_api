'use strict';

const Controller = require('./application');

class UserController extends Controller {
	//GET /api/users
	async index() {
		const params = this.ctx.query
		if (params.page == undefined) params.page = 1;
		if (params.per_page == undefined) params.per_page = 20
		const users = await this.ctx.model.User.findAndCount({
			attributes: ['id', 'name', 'avatar_url', 'active', 'role', 'created_at'],
			order: [['created_at', 'desc']],
			limit: params.per_page,
			offset: params.per_page * (params.page - 1),
		})
		this.success(users)
	}

	//PUT /api/users/:id
	async update() {
		const { model, params, request } = this.ctx
		let user = await model.User.findById(params.id)
		const result = await user.update(request.body)
		this.success(result)
	}

	//GET /api/user/get_validate_code
	async get_validate_code() {
		const { query, model } = this.ctx
		if (query.email == undefined) {
			return this.error("邮箱地址为空")
		}

		await model.UserMailValidation.generate_code(query.email)
		this.success()

	}

	// POST /api/users/register
	async register() {
		const { body } = this.ctx.request
		var user = this.ctx.model.User.build()
		const result = await user.register(body)
		console.log('result', result)
		if (result.success === true) {
			this.success(await this.loginSuccess(result.user))
		} else {
			this.error(result.errors)
		}
	}

	//POST /api/users/login
	async login() {
		const { body } = this.ctx.request
		const user = await this.ctx.model.User.login(body.name, body.password)
		if (user != null) {
			return this.success(await this.loginSuccess(user))
		} else {
			this.error("密码错误!")
		}
	}

	//POST /api/users/update_info
	async update_avatar() {
		const { body } = this.ctx.request
		const user = await this.ctx.currentUser
		const result = await user.update({ avatar_url: body.avatar_url })
		this.success(result)
	}
}

module.exports = UserController