require("dotenv").config()

const express = require("express")
const router = express.Router()

// User model.
const { User, validateRequest } = require("../models/user")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

router.post("/", async (req, res) => {
  // Check for errors.
  const { err } = validateRequest(req.body)
  if (err) {
    return res.status(400).send(err.details[0].message)
  }

  // Check user/email.
  let checkUser = await User.findOne({ email: req.body.email })
  if (!checkUser) {
    return res.status(400).send("Invalid data.")
  }

  // Check password.
  let checkPassword = await bcrypt.compare(
    req.body.password,
    checkUser.password
  )
  if (!checkPassword) {
    return res.status(400).send("Invalid data.")
  }

  if (process.env.PRIVATE_KEY == undefined) {
    process.exit(1)
  }
  // Send token.
  const token = jwt.sign({ _id: checkUser._id }, process.env.PRIVATE_KEY)

  res
    .header("x-auth-token", token)
    .send(_.pick(checkUser, ["_id", "name", "email"]))
})

module.exports = router
