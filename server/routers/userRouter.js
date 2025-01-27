const express = require("express")
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const router = express.Router()


router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.get("/", UserController.getUser)
router.get("/data", UserController.getUserOrder)
router.get("/profile",authentication, UserController.userProfil)
router.put("/profile/update", authentication, UserController.updateProfile)
router.get("/profile/:id", UserController.getUserById)

module.exports = router