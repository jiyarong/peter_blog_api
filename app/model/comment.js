module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define('comments', {
    content: STRING,
    created_at: DATE,
    commentable: STRING,
    commentable_id: INTEGER,
    created_by: INTEGER
  })

  Comment.associate = function () {
    app.model.Comment.belongsTo(app.model.User, { as: 'creator', foreignKey: 'created_by' })
  }

  return Comment;
}