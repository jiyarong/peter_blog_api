'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {name: '技术', created_at: new Date(), updated_at: new Date()},
      {name: '生活', created_at: new Date(), updated_at: new Date()},
      {name: '求助', created_at: new Date(), updated_at: new Date()},
      {name: '其他', created_at: new Date(), updated_at: new Date()}
    ], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
