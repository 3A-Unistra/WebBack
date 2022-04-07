'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      piece: {
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.STRING
      }
    });
    await queryInterface.createTable('User_password_reset_token', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID
      }
    }).then(() => queryInterface.addConstraint('User_password_reset_token',{
        type: 'foreign key',
        name: 'user_id_fk',
        fields: ['user_id'],
        references: {
          table: 'Users',
          field: 'id'
        }
      }
    ))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('User_password_reset_token');
    await queryInterface.removeConstraint('User_password_reset_token', 'user_id_fk');
  }
};