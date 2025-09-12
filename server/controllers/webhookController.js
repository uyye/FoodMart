const { Order, OrderDetail, Product } = require("../models");

const handlePaymentNotification = async (req, res, next) => {
  try {
    const notification = req.body;
    const { order_id, transaction_status } = notification;

    const orderData = await Order.findOne({
      where: { id: order_id },
      include: [{ model: OrderDetail, include: { model: Product } }],
    });

    if (!orderData) {
      throw { name: "NotFound", status: 404, message: "order not found" };
    }

    if (
      transaction_status === "capture" ||
      transaction_status === "settlement"
    ) {
      orderData.status = "success";
      for (const item of orderData.OrderDetails) {
        item.Product.stock = item.Product.stock - item.quantity;
        await item.Product.save();
      }
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
  } catch (error) {
    next(error);
  }
};

module.exports = handlePaymentNotification;
