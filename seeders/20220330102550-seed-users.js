'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  return queryInterface.bulkInsert('Users', [{
    login: 'DarkGeo67',
    name: 'Geoffrey',
    password: 'motdepasse',
    email: 'geoffrey@gmail.com',
  }, {
    login: 'XxAmauryxX',
    name: 'Amaury',
    password: 'encoreamaury',
    email: 'lemauetlery@gmail.com',
  }], {});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
