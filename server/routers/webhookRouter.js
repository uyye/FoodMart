const express = require("express")
const handlePaymentNotification = require("../controllers/webHookController")
const router = express.Router()

router.post("/midtrans", handlePaymentNotification)

module.exports = router