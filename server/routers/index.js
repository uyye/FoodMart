const express = require("express")
const router = express.Router()

const userRouter = require("./userRouter")
const productRouter = require("./productRouters")
const orderRouter = require("./orderRouter")
const webhookRouter = require("./webhookRouter")
const cartRouter = require("./cartRouter")

router.use("/users", userRouter)
router.use("/products", productRouter)
router.use("/orders", orderRouter)
router.use("/webhooks", webhookRouter)
router.use("/carts", cartRouter)

module.exports = router