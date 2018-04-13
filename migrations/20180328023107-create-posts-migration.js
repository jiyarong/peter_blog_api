'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('posts', {
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

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      title: Sequelize.STRING,

      content: {
        type: "TEXT"
      }
    })

    queryInterface.addIndex('posts', {
      fields: ['user_id']
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('posts')
  }
};
