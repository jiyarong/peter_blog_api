module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const Category = app.model.define('categories', {
		name: STRING
	})

	Category.associate = function () {
		app.model.Category.belongsTo(app.model.Category, {
			as: 'parent',
			foreignKey: 'parent_id'
		});

		app.model.Category.hasMany(app.model.Category, {
			as: 'children',
			foreignKey: 'parent_id'
		})
	}

	return Category;
}