'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('user_mail_validations', {
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

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      validate_code: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    return queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('user_mail_validations')
    return queryInterface.removeColumn('users', 'email')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
