module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const UserMailValidation = app.model.define('user_mail_validations', {
    email: STRING,
    validate_code: STRING
  })
  
  UserMailValidation.generate_code = async function (email) {
    let v = UserMailValidation.build({email: email})
    v.validate_code = new Date().getTime().toString().substring(7)
    const result = await v.save()
    app.email.sendEmail('请在15分钟内填写验证码',`您的验证码: ${v.validate_code}`, email)
    return v.validate_code
  }

	return UserMailValidation;
}