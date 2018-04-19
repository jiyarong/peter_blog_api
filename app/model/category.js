module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const Category = app.model.define('categories', {
		name: STRING
	})

	return Category;
}