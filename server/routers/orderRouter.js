const express = require("express")
const authentication = require("../middlewares/authentication")
const OrderController = require("../controllers/orderController")
const router = express.Router()

router.post("/", authentication, OrderController.orderProduct)
router.get("/", authentication, OrderController.userOrder)
router.post("/payment", authentication, OrderController.payment)
router.post("/webhook", authentication, OrderController.handlePaymentNotification)
router.get("/data", OrderController.adminOrder)

router.get("/current-month", OrderController.orderMonthly)
router.get("/top-order", OrderController.topOrder)
router.get("/list", OrderController.findAllOrder)
router.get("/detail/:id", OrderController.getDetailOrder)
router.put("/read/:id", OrderController.markRead)

module.exports = router