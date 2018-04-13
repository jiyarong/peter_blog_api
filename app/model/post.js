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
		app.model.Post.belongsTo(app.model.User)
	}

	return Post;
}