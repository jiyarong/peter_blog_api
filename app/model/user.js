var md5 = require("md5")
var moment = require("moment")

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
		email: {
			type: STRING,
			validate: {
				isUnique: async function (email) {
					e = await User.find({where:{email: email}});
					if (e) { return Promise.reject('该邮箱已被使用!') }
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
		const { name, password, password_confirm, email, validate_code } = body
		const { gt } = app.Sequelize.Op;
		const mailValidate = await app.model.UserMailValidation.findOne({
			where: {
				email: email,
				validate_code: validate_code,
				created_at: {
					[gt]: moment().subtract(15, 'minute').format()
				}
			}
		})

		if (mailValidate == undefined) {
			return {
				success: false,
				errors: '验证码已过期'
			}
		}

		this.name = name
		this.encrypted_password = md5(password)
		this.email = email
		try {
			const result = await this.save()
			return {
				success: true,
				user: result
			}
		} catch(err) {
			if (err.name === "SequelizeValidationError")
			return {
				success: false,
				errors: err.errors[0].message
			}
		}
		
	
	}

	User.associate = function () {
		app.model.User.hasMany(app.model.Post, {
			as: 'posts'
		})
	}

	return User
}