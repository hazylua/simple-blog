require("dotenv").config()

const { User } = require("../models/user")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

const userLogin = async (req, res) => {
  try {
    let user_info = await User.findOne({ email: req.body.email })
    if (!user_info) {
      return res.status(400).send("This email is not registered.")
    }
    let user_password = await bcrypt.compare(
      req.body.password,
      user_info.password
    )
    if (!user_password) {
      return res.status(400).send("Wrong password.")
    }

    if (process.env.PRIVATE_KEY == undefined) {
      console.log("Cannot continue without a private key.\nExiting process.")
      process.exit(1)
    }

    // Send token.
    const token = jwt.sign({ _id: user_info._id }, process.env.PRIVATE_KEY)
    res.send(token)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

module.exports = {
  userLogin: userLogin,
}
