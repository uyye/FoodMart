'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.OrderDetail, {foreignKey:"productId"})
      Product.hasMany(models.Review, {foreignKey:"productId"})
      Product.hasMany(models.CartItem, {foreignKey:"productId"})
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Name is required"},
        notNull:{msg:"Name is required"},
      }
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Category is required"},
        notNull:{msg:"Category is required"},
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Description is required"},
        notNull:{msg:"Description is required"},
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Price is required"},
        notNull:{msg:"Price is required"},
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Stock is required"},
        notNull:{msg:"Stock is required"},
      }
    },
    imageUrl: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Image Url is required"},
        notNull:{msg:"Image Url is required"},
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};