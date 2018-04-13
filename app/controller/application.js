'use strict';

const Controller = require('egg').Controller;
var md5 = require("md5")
var moment = require("moment")

class ApplicationController extends Controller {
	success(data) {
		this.ctx.body = {
			success: true,
			data: data
		}
	}

	error(err) {
		this.ctx.body = {
			success: false,
			err: err
		}
	}

	async currentUser() {
		const token = this.ctx.header.token
		const  {gt, lte, ne, in: opIn} = this.ctx.app.Sequelize.Op;
		const session = await this.ctx.model.UserSession.findOne({
			where: {
				token: token,
				expire_at: {
					[gt]: new Date()
				}
			}
		});

		if (session) {
			const user = await session.getUser()
			return user
		} else {
			return undefined
		}
	}

	async loginSuccess(user) {
		let session = await this.ctx.model.UserSession.create({
			user_id: user.id,
			token: md5(`${user.name}-${user.id}-${new Date().getTime()}`),
			expire_at: moment().add('1', 'month').format()
		})
		return {
			token: session.token,
			name: user.name
		}
	}
}

module.exports = ApplicationController