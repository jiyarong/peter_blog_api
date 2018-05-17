module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const Post = app.model.define('posts', {
		title: STRING,
		content: 'TEXT',
		created_at: DATE,
		updated_at: DATE,
		deleted_at: DATE,
		user_id: INTEGER,
	}, {
		scopes: {
			not_deleted: {
				where: {
					deleted_at: null
				}
			}
		}
	})

	Post.associate = function () {
		app.model.Post.belongsTo(app.model.User, { as: 'user' });
		app.model.Post.belongsTo(app.model.Category, { as: 'category' });
		app.model.Post.belongsTo(app.model.Category, { 
			as: 'sub_category',
			foreignKey: 'sub_category_id'
		});

		app.model.Post.hasMany(app.model.Comment, {
			foreignKey: 'commentable_id',
			constraints: false,
			scope: {
				commentable: 'post'
			},
			as: 'comments'
		});
	}

	return Post;
}