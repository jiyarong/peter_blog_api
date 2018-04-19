module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const Post = app.model.define('posts', {
		title: STRING,
		content: 'TEXT',
		created_at: DATE,
		updated_at: DATE,
		user_id: INTEGER

	})

	Post.associate = function () {
		app.model.Post.belongsTo(app.model.User, { as: 'user' });
		app.model.Post.belongsTo(app.model.Category, { as: 'category' });
		app.model.Post.hasMany(app.model.Comment, {
			foreignKey: 'commentable_id',
			constraints: false,
			scope: {
				commentable: 'post'
			},
			as: 'comments'
		})
	}

	return Post;
}