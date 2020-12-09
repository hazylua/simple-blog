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
  try {
    let name = await User.findOne({ name: req.body.name })
    let email = await User.findOne({ email: req.body.email })

    if (name) {
      return res.status(400).send("Username is already registered.")
    }
    if (email) {
      return res.status(400).send("Email is already registered.")
    } else {
      const user_info = _.pick(req.body, ["name", "email", "password"])
      let user = new User({
        ...user_info,
        admin: 0,
      })
      const salt = await bcrypt.genSalt(SALT_FACTOR)
      user.password = await bcrypt.hash(user.password, salt)
      await user.save()

      res.send(_.pick(user, ["_id", "name", "email"]))
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
