'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('categories', 'parent_id', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('posts', 'sub_category_id', {
      type: Sequelize.INTEGER
    })

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('categories', 'parent_id')
    queryInterface.removeColumn('posts', 'sub_category_id')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
