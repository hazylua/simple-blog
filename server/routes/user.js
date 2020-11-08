const { User, validateUser } = require("../models/user")
const express = require("express")
const _ = require("lodash")
const router = express.Router()

const SALT_FACTOR = 10

const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
  // Check for errors.
  const { err } = validateUser(req.body)
  if (err) {
    return res.status(400).send(err.details[0].message)
  }

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send("Email is already registered.")
  } else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    user = new User(_.pick(req.body, ["name", "email", "password"]))
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    res.send(_.pick(user, ["_id", "name", "email"]))
  }
})

module.exports = router
