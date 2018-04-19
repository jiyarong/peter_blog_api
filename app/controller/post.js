'use strict';

const Controller = require('./application');

class PostController extends Controller {
	//GET /api/posts
	async index() {
		const params = this.ctx.query
		if (params.page == undefined) params.page = 1;
		if (params.per_page == undefined) params.per_page = 20
		let tabQuery = {}
		if (params.tab && params.tab.toString().length > 0) {
			if (params.tab.toString() == '-1') {
				tabQuery = { user_id: (await this.currentUser()).id }
			} else {
				tabQuery = { category_id: params.tab }
			}
		}

		const posts = await this.ctx.model.Post.findAndCount({
			attributes: ['id', 'user_id', 'title', 'updated_at'],
			order: [['updated_at', 'desc']],
			limit: params.per_page,
			offset: params.per_page * (params.page - 1),
			include: [
				{ model: this.ctx.model.User, as: 'user', attributes: ['name', 'avatar_url'] },
				{ model: this.ctx.model.Category, as: 'category', attributes: ['name'] }
			],
			where: {
				...tabQuery
			}
		})
		this.success(posts)
	}

	//GET /api/posts/:id
	async show() {
		const post = await this.ctx.model.Post.findById(this.ctx.params.id, {
			order: [[this.ctx.model.Comment, 'created_at', 'asc']],
			include: [
				{
					model: this.ctx.model.Comment,
					as: 'comments', 
					attributes: ['created_at', 'content', 'created_by', 'id'],
					include: [
						{model: this.ctx.model.User, as: 'creator', attributes: ['id', 'name', 'avatar_url']}
					]
				},
				{model: this.ctx.model.User, as: 'user', attributes: ['name', 'id', 'avatar_url']}
			]
		})
		this.success(post)
	}

	//POST /api/posts
	async create() {
		var post = this.ctx.model.Post.build(this.ctx.request.body)
		const user = await this.currentUser()
		if (user === undefined) {
			return this.render_405()
		} else {
			post.user_id = user.id
			const result = await post.save()
			return this.success(result)
		}
	}
}

module.exports = PostController;