'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'avatar_url', {
      type: Sequelize.STRING
    });

    queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      defaultValue: '游客',
    });

    queryInterface.addColumn('users', 'active', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'avatar_url')
    queryInterface.removeColumn('users', 'role')
    queryInterface.removeColumn('users', 'active')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
