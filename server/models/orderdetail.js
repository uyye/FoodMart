'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {foreignKey:"orderId"})
      OrderDetail.belongsTo(models.Product, {foreignKey:"productId"})
    }
  }
  OrderDetail.init({
    orderId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"orderId required"},
        notEmpty:{msg:"orderId required"}
      }
    },
    productId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"productId required"},
        notEmpty:{msg:"productId required"}
      }
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"quantity required"},
        notEmpty:{msg:"quantity required"}
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"price required"},
        notEmpty:{msg:"price required"}
      }
    },
    subTotal: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"subTotal required"},
        notEmpty:{msg:"subTotal required"}
      }
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};