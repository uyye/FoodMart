'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order,{foreignKey:"userId"})
      User.hasMany(models.Review, {foreignKey:"userId"})
      User.hasOne(models.Cart, {foreignKey:"userId"})
    }
  }
  User.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"name is required"
        },
        notNull:{
          msg:"name is required"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:{
          args:true,
          msg:"incorrect email format"
        },
        notEmpty:{
          msg:"email is required"
        },
        notNull:{
          msg:"email is required"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args:[6],
          msg:"password must be at least 6 characters long"
        },
        notEmpty:{
          msg:"password is required"
        },
        notNull:{
          msg:"password is required"
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"role is required"
        },
        notNull:{
          msg:"role is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, option)=>{
    user.password = await hashing(user.password)
  })

  User.beforeUpdate(async (user, option)=>{
    user.password = await hashing(user.password)
  })
  return User;
};