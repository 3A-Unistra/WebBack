'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addConstraint('User_friends',{
      type: 'foreign key',
      name: 'friend_id_fk',
      onDelete: 'CASCADE',
      fields: ['friend_id'],
      references: {
        table: 'Users',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('User_friends',{
      type: 'foreign key',
      name: 'user_id_fk',
      onDelete: 'CASCADE',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('User_password_reset_token',{
      type: 'foreign key',
      name: 'user_id_fk',
      onDelete: 'CASCADE',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id'
      }
    }
  );
    await queryInterface.addIndex('User_friends', ['user_id', 'friend_id'], {
      name: 'user_friends_user_id_friend_id_e1a66b48_uniq',
      unique: true
     });
     await queryInterface.addIndex('User_friends', ['friend_id'], {
      name: 'user_friends_friend_id_34769ea0'
     });
     await queryInterface.addIndex('User_friends', ['user_id'], {
      name: 'user_friends_user_id_dd550e2d'
     });
     await queryInterface.addIndex('User_password_reset_token', ['user_id'], {
      name: 'user_password_reset_tokens_user_id_e9b7220f'
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
    await queryInterface.removeConstraint('User_friends', 'user_id_fk');
    await queryInterface.removeConstraint('User_friends', 'friend_id_fk');
    await queryInterface.removeConstraint('User_friends', 'user_id_fk');
    await queryInterface.removeIndex('User_friends', 'user_friends_user_id_friend_id_e1a66b48_uniq');
    await queryInterface.removeIndex('User_friends', 'user_friends_friend_id_34769ea0');
    await queryInterface.removeIndex('User_friends', 'user_friends_user_id_dd550e2d');
    await queryInterface.removeIndex('User_password_reset_token', 'user_password_reset_tokens_user_id_e9b7220f');

      /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
