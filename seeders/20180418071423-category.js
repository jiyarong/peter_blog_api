'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {name: '技术', created_at: new Date(), updated_at: new Date(), id: 1},
      {name: '生活', created_at: new Date(), updated_at: new Date(), id: 2},
      {name: '求助', created_at: new Date(), updated_at: new Date(), id: 3},
      {name: '其他', created_at: new Date(), updated_at: new Date(), id: 4},

      {name: 'Ruby', created_at: new Date(), updated_at: new Date(), id: 5, parent_id: 1},
      {name: 'Javascript', created_at: new Date(), updated_at: new Date(), id: 6, parent_id: 1},
      {name: 'Go', created_at: new Date(), updated_at: new Date(), id: 7, parent_id: 1},
      {name: 'Java', created_at: new Date(), updated_at: new Date(), id: 8, parent_id: 1},
      {name: 'C++', created_at: new Date(), updated_at: new Date(), id: 9, parent_id: 1},
      {name: 'C#', created_at: new Date(), updated_at: new Date(), id: 10, parent_id: 1},
      {name: 'Docker', created_at: new Date(), updated_at: new Date(), id: 11, parent_id: 1},
      {name: '服务器&部署', created_at: new Date(), updated_at: new Date(), id: 12, parent_id: 1},
      {name: 'windows', created_at: new Date(), updated_at: new Date(), id: 13, parent_id: 1},
      {name: 'linux', created_at: new Date(), updated_at: new Date(), id: 14, parent_id: 1},
      {name: 'mac', created_at: new Date(), updated_at: new Date(), id: 15, parent_id: 1},

      {name: '游戏', created_at: new Date(), updated_at: new Date(), id: 16, parent_id: 2},
      {name: '电影', created_at: new Date(), updated_at: new Date(), id: 17, parent_id: 2},
      {name: '漫画', created_at: new Date(), updated_at: new Date(), id: 18, parent_id: 2},
      {name: '音乐', created_at: new Date(), updated_at: new Date(), id: 19, parent_id: 2},
      {name: '动画', created_at: new Date(), updated_at: new Date(), id: 20, parent_id: 2}
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
