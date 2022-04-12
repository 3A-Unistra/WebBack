'use strict';

const uuidv4 = require('uuid');
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
    id: uuidv4.v4(),
    login: 'DarkGeo67',
    name: 'Geoffrey',
    password: 'motdepasse',
    email: 'geoffrey@gmail.com',
    piece: 0,
    avatar: ''
  }, {
    id: uuidv4.v4(),
    login: 'XxAmauryxX',
    name: 'Amaury',
    password: 'encoreamaury',
    email: 'lemauetlery@gmail.com',
    piece: 0,
    avatar: ''
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
