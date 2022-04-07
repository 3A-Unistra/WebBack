'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_password_reset_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_password_reset_tokens.belongsTo(models.Users, {foreignKey: 'user_id'});
    }
  }
  User_password_reset_tokens.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },  
    date: DataTypes.DATE,
    user_id : {
      type: DataTypes.UUID,
      references: {
          table: 'Users',
          key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User_password_reset_tokens',
    timestamps: false
  });
  return User_password_reset_tokens;
};