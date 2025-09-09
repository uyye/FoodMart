const { Op } = require("sequelize");
const {
  Order,
  Product,
  OrderDetail,
  User,
  sequelize,
  Sequelize,
} = require("../models");
const midtransClient = require("midtrans-client");

class OrderController {
  static async orderProduct(req, res, next) {
    const { products, addressShiping, phoneNumber } = req.body;
    const userId = req.user.id;
    let totalPrice = 0;
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const newOrder = await Order.create({
        userId,
        totalPrice: 0,
        status: "pending",
        addressShiping,
        phoneNumber,
      });

      for (const item of products) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          throw { name: "NotFound", status: 404, message: "product not found" };
        }

        const itemTotalPrice = product.price * item.quantity;
        totalPrice += itemTotalPrice;

        await OrderDetail.create(
          {
            orderId: newOrder.id,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
            subTotal: product.price * item.quantity,
          },
          { transaction }
        );
      }

      newOrder.totalPrice = totalPrice;
      await newOrder.save({ transaction });

      // req.io.to("adminRoom").emit("newOrder", {
      //     message:"Ada orderan baru",
      //     order:newOrder
      // })

      await transaction.commit();
      res.status(201).json({
        message: "Order created successfuly",
        newOrder,
      });
    } catch (error) {
      next(error);
      if (transaction) await transaction.rollback();
      console.log(error);
    }
  }

  static async userOrder(req, res, next) {
    try {
      const data = await Order.findAll({
        where: { userId: req.user.id },
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: OrderDetail, include: Product },
        ],
        order: [["createdAt", "desc"]],
      });

      if (!data) {
        throw { name: "NotFound", status: 404, message: "Order Not Found" };
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async adminOrder(req, res, next) {
    try {
      const { page = 1 } = req.query;
      let options = { where: {} };
      if (page) {
        options.limit = 10;
        options.offset = (page - 1) * 10;
      }
      const data = await Order.findAll(options);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async payment(req, res, next) {
    let snap = new midtransClient.Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANSSERVERKEY,
    });
    try {
      const { orderId } = req.body;
      const data = await Order.findByPk(orderId, {
        include: { model: User, attributes: { exclude: ["password"] } },
      });

      if (!data) {
        throw { name: "NotFound", status: 404, message: "Order not found" };
      }

      console.log(data, "CEK DATA PEMBAYARAN");

      let parameter = {
        transaction_details: {
          order_id: `MANGAFD-${data.id}-${Date.now()}`,
          gross_amount: data.totalPrice,
        },
        page_expiry: {
          duration: 3,
          unit: "hours",
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: data.User.name.split(" ")[0],
          last_name: data.User.name.split(" ")[1] || "",
          email: data.User.email,
        },
      };

      const token = await snap.createTransaction(parameter);
      res.status(201).json(token);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static handlePaymentNotification = async (req, res, next) => {
    try {
      const notification = req.body;
      const { order_id, transaction_status } = notification;

      const orderData = await Order.findOne({
        where: { id: order_id },
        include: [{ model: OrderDetail, include: { model: Product } }],
      });

      console.log(JSON.stringify(orderData, null, 2));
      ``;

      if (!orderData) {
        throw { name: "NotFound", status: 404, message: "order not found" };
      }

      if (
        transaction_status === "capture" ||
        transaction_status === "settlement"
      ) {
        orderData.status = "success";
        for (const item of orderData.OrderDetails) {
          console.log(item.Product.stock, item.quantity);
          item.Product.stock = item.Product.stock - item.quantity;
          console.log(item.Product.stock);
          await item.Product.save();
        }

        req.io.to("adminRoom").emit("newOrder", {
          message: "You get new order",
          order: orderData,
        });
      } else if (
        transaction_status === "deny" ||
        transaction_status === "cancel"
      ) {
        orderData.status = "failed";
      } else if (transaction_status === "pending") {
        orderData.status = "pending";
      }

      await orderData.save();
      res.status(200).json({ message: "payment status updated successfully" });
      console.log("payment status updated successfully");
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  static async orderMonthly(req, res, next) {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");

      const startDate = `${year}-${month}-01`;
      const endDate = new Date(year, month, 1).toISOString().split("T")[0];

      const order = await Order.findAll({
        attributes: [
          [Sequelize.fn("DATE", Sequelize.col("createdAt")), "date"],
          [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "total"],
        ],
        where: {
          status: "success",
          createdAt: { [Op.between]: [startDate, endDate] },
        },
        group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
        order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
      });

      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async topOrder(req, res, next) {
    try {
      const data = await OrderDetail.findAll({
        attributes: [
          [Sequelize.col("Product.id"), "productId"],
          [Sequelize.col("Product.name"), "productName"],
          [Sequelize.col("Product.imageUrl"), "productImage"],
          [
            Sequelize.fn("SUM", Sequelize.col("quantity")),
            "totalQuantityOrder",
          ],
        ],
        include: {
          model: Product,
          attributes: [],
        },
        group: ["Product.id", "Product.name"],
        order: [[Sequelize.fn("SUM", Sequelize.col("quantity")), "desc"]],
        limit: 5,
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getDetailOrder(req, res, next) {
    try {
      const { id } = req.params;

      const data = await OrderDetail.findAll({
        where: { orderId: id },
        include: Product,
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findAllOrder(req, res, next) {
    try {
      const { filter, page } = req.query;
      console.log(`${filter} ini filter, ${page} ini page`);

      let isRead;

      if (filter === "true") {
        isRead = true;
      } else if (filter === "false") {
        isRead = false;
      } else if (!filter) {
        isRead = {};
      }

      let option = {
        where: {},
        include: { model: User, attributes: ["name"] },
        order: [["createdAt", "desc"]],
      };

      if (filter) {
        option.where.isRead = { [Op.eq]: isRead };
      }

      if (page) {
        console.log("MASUK PAGE", page);
        option.limit = 10;
        option.offset = (Number(page) - 1) * 10;
      }

      const { count, rows } = await Order.findAndCountAll(option);

      res.status(200).json({ totalItems: count, orders: rows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async markRead(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        throw {
          name: "NotFound",
          status: 404,
          message: "Order data not found",
        };
      }

      order.isRead = true;
      await order.save();
      res.status(200).json({ message: "Marking success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderController;
