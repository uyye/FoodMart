const express = require("express")
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

// PUBLIC
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/profile/update", authentication, UserController.updateProfile)
router.get("/", UserController.getUser)


//ADMIN
router.get("/profile",authentication, UserController.userProfil)

//PARAMS
router.get("/profile/:id", UserController.getUserById)
router.delete("/delete/:id", UserController.deleteUser)

module.exports = router