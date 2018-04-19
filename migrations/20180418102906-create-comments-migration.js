'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      content: {
        type: Sequelize.STRING,
        allowNull: false
      },

      commentable: {
        type: Sequelize.STRING,
        allowNull: false
      },

      commentable_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })

    queryInterface.addIndex('comments', ['commentable_id'])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('comments', ['commentable_id'])
    queryInterface.dropTable('comments')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
