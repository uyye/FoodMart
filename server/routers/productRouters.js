const express = require("express")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/adminAuthorization")
const router = express.Router()
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})

router.get("/", ProductController.AllProduct)
router.post("/", upload.single("file"), ProductController.addProduct)
router.get("/:id", ProductController.productById)
router.put("/:id", upload.single("file"), ProductController.updateProduct)
router.delete("/:id", ProductController.deleteProduct)

module.exports = router