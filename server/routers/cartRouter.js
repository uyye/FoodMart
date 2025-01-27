const express = require("express")
const CartController = require("../controllers/cartController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.post("/", authentication, CartController.createCart)
router.get("/", authentication, CartController.getUserCart)
router.put("/", authentication, CartController.updateCartQuantity)
module.exports = router