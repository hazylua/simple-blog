const express = require("express")
const router = express.Router()

const { validateUserLogin } = require("../models/user")
const loginController = require("../controllers/login-controller")
const validateMiddleware = require("../middleware/joi-validator")

router.post(
  "/",
  validateMiddleware(validateUserLogin),
  loginController.userLogin
)

module.exports = router
