'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User_friends',{
      id: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      friend_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,

      }
    });
    await queryInterface.addConstraint('User_friends',{
      type: 'foreign key',
      name: 'friend_id_fk',
      fields: ['friend_id'],
      references: {
        table: 'Users',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('User_friends',{
      type: 'foreign key',
      name: 'user_id_fk',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id'
      }
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('User_password_reset_token', 'user_id_fk');
    await queryInterface.removeConstraint('User_friends', 'friend_id_fk');
    await queryInterface.removeConstraint('User_friends', 'user_id_fk');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('User_password_reset_token');
    await queryInterface.dropTable('user_friends');
      /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
