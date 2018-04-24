var md5 = require("md5")

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const User = app.model.define('users', {
		name: {
			type: STRING,
			validate: {
				isUnique: async function (name) {
					u = await User.find({where:{name: name}});
					if (u) { return Promise.reject('该用户已存在!') }
				} 
			}
		},
		created_at: DATE,
		updated_at: DATE,
		encrypted_password: STRING,
		avatar_url: STRING,
		role: STRING
	})

	User.Enum = {
		Active: {
			active: 1,
			inactive: 0	
		}
	}

	User.login = async function (name, password) {
		const user = await User.findOne({
			where: {
				name: name,
				encrypted_password: md5(password),
				active: User.Enum.Active.active
			},
			attributes: ['name', 'avatar_url', 'id', 'role']
		})

		return user
	}
	
	//用户注册
	User.prototype.register = async function (body) {
		const { name, password, password_confirm } = body
		this.name = name
		this.encrypted_password = md5(password)
		try {
			result = await this.save()
		} catch(err) {
			if (err.name === "SequelizeValidationError")
			return {
				success: false,
				errors: err.errors[0].message
			}
		}
		
		return {
			success: true,
			user: result
		}
	}

	User.associate = function () {
		app.model.User.hasMany(app.model.Post, {
			as: 'posts'
		})
	}

	return User
}