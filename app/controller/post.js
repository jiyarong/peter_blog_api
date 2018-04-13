'use strict';

const Controller = require('./application');

class PostController extends Controller {
	//GET /api/posts
  async index () {
		const params = this.ctx.query
		if (params.page == undefined) params.page = 1;
		if (params.per_page == undefined) params.per_page = 20
		const posts = await this.ctx.model.Post.findAndCount({
			attributes: ['id', 'user_id', 'title', 'updated_at'],
			order: [['updated_at', 'desc']],
			limit: params.per_page,
			offset: params.per_page * (params.page - 1)
		})
    this.ctx.body = posts;
	}
	
	//GET /api/posts/:id
	async show () {
		const user = await this.ctx.model.Post.findById(this.ctx.params.id)
		this.ctx.body = user
	}

	//POST /api/posts
	async create () {
		var post = this.ctx.model.Post.build(this.ctx.request.body)
		const user = await this.currentUser()
		if (user === undefined) {
			return this.error("登录已过期!")
		} else {
			post.user_id = user.id
			const result = await post.save()
			return this.success(result)
		}	
	}
}

module.exports = PostController;