'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_friends.belongsTo(models.Users, {foreignKey: 'user_id'});
      User_friends.belongsTo(models.Users, {foreignKey: 'friend_id'});

    }
  }
  User_friends.init({
    id: {
      type: DataTypes.INTEGER,
      //defaultValue: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    friend_id : {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          table: 'users',
          key: 'id'
      }
    }, 
    user_id : {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          table: 'users',
          key: 'id'
      }
    }
  },  {
    sequelize,
    modelName: 'User_friends',
    tableName: 'user_friends',
    timestamps: false
  });
  return User_friends;
};
