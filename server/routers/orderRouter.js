const express = require("express")
const authentication = require("../middlewares/authentication")
const OrderController = require("../controllers/orderController")
const router = express.Router()

router.post("/", authentication, OrderController.orderProduct)
router.get("/", authentication, OrderController.userOrder)
router.post("/payment", authentication, OrderController.payment)
router.post("/webhook", authentication, OrderController.handlePaymentNotification)
router.get("/current-month", OrderController.orderMonthly)
router.get("/admin", OrderController.adminOrder)
router.get("/top-order", OrderController.topOrder)
router.get("/detail", OrderController.getDetailOrder)

module.exports = router