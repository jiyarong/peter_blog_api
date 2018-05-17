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
				tabQuery = { user_id: this.ctx.currentUser.id }
			} else {
				tabQuery = { category_id: params.tab }
			}
		}

		const posts = await this.ctx.model.Post.scope('not_deleted').findAndCount({
			scope: 'not_deleted',
			attributes: ['id', 'user_id', 'title', 'updated_at'],
			order: [['updated_at', 'desc']],
			limit: parseInt(params.per_page),
			offset: params.per_page * (params.page - 1),
			include: [
				{ model: this.ctx.model.User, as: 'user', attributes: ['name', 'avatar_url', 'id'] },
				{ model: this.ctx.model.Category, as: 'category', attributes: ['name'] },
				{ model: this.ctx.model.Category, as: 'sub_category', attributes: ['name'] }
 			],
			where: {
				...tabQuery
			}
		})
		this.success(posts)
	}

	//GET /api/posts/:id
	async show() {
		let include = [
			{
				model: this.ctx.model.User,
				as: 'user',
				attributes: ['avatar_url', 'name', 'id']
			}
		]

		let include_comments = {
			model: this.ctx.model.Comment,
			as: 'comments',
			attributes: ['created_at', 'content', 'created_by', 'id'],
			include: [
				{
					model: this.ctx.model.User,
					as: 'creator',
					attributes: ['avatar_url', 'name', 'id']
				}
			]
		}

		let order = []

		if (this.ctx.query.with_comment == 'true') {
			include.push(include_comments)
			order.push([this.ctx.model.Comment, 'created_at', 'asc'])
		}

		const post = await this.ctx.model.Post.scope('not_deleted').findById(this.ctx.params.id, {
			order: order,
			include: include
		})
		this.success(post)
	}

	//POST /api/posts
	async create() {
		const { model, currentUser } = this.ctx
		var post = model.Post.build(this.ctx.request.body)
		post.user_id = currentUser.id
		const result = await post.save()
		return this.success(result)
	}

	//PUT /api/posts/:id
	async update() {
		const { model, currentUser, params, request } = this.ctx
		let post = await model.Post.findById(params.id)
		if (post == undefined) { return this.error('未找到该文章') }
		if (post.created_by == currentUser.id || currentUser.role == '管理员') {
			const result = await post.update(request.body)
			return this.success(result)
		} else {
			return this.error('你没有权限更改该条文章!')
		}
	}

	//DELETE /api/posts/:id
	async destroy() {
		const { params, currentUser, model } = this.ctx
		let post = await model.Post.findById(params.id)
		if (post == undefined) { return this.error('未找到该文章') }
		if (post.created_by == currentUser.id || currentUser.role == '管理员') {
			const result = await post.update({deleted_at: new Date()})
			return this.success(result)
		} else {
			return this.error('你没有权限更改该条文章!')
		}

	}

	//GET /api/posts/recent_posts?user_id=?
	async recent_posts() {
		let user_id = this.ctx.params.id

		if (user_id == undefined && this.ctx.currentUser != undefined) {
			user_id = this.ctx.currentUser.id
		} else {
			return this.error("用户id错误")
		}

		const user = await this.ctx.model.User.findById(user_id)

		if (user != undefined) {
			const posts = await user.getPosts({
				scope: 'not_deleted',
				limit: 10,
				order: [['updated_at', 'desc']],
				include: [
					{ model: this.ctx.model.User, as: 'user', attributes: ['name', 'avatar_url', 'id'] },
					{ model: this.ctx.model.Category, as: 'category', attributes: ['name'] },
					{ model: this.ctx.model.Category, as: 'sub_category', attributes: ['name'] }
				]
			})
			return this.success(posts)
		} else {
			return this.error("用户id错误")
		}
	}
}

module.exports = PostController;