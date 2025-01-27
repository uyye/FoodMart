'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {foreignKey:"userId"})
      Order.hasMany(models.OrderDetail, {foreignKey:"orderId"})
      Order.hasOne(models.Payment, {foreignKey:"orderId"})
    }
  }
  Order.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"userId required"},
        notEmpty:{msg:"userId required"}
      }
    },
    totalPrice: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"totalPrice required"},
        notEmpty:{msg:"totalPrice required"}
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"status required"},
        notEmpty:{msg:"status required"}
      }
    },
    addressShiping: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Address shiping required"},
        notEmpty:{msg:"Address shiping required"}
      }
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Phone number required"},
        notEmpty:{msg:"Phone number required"}
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};