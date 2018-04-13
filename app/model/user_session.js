module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const UserSession = app.model.define('user_sessions', {
		user_id: INTEGER,
		created_at: DATE,
		updated_at: DATE,
		token: STRING,
		expire_at: DATE
	})

	UserSession.associate = function () {
		app.model.UserSession.belongsTo(app.model.User, { as: 'user' })
	}

	return UserSession
}