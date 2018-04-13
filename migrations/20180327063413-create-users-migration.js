'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      name: Sequelize.STRING,
      encrypted_password: Sequelize.STRING
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
