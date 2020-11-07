const Joi = require("joi")
const mongoose = require("mongoose")

const lenMin = 5
const lenMax = 255

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      require: true,
      lenMin: lenMin,
      lenMax: lenMax,
    },
    email: {
      type: String,
      require: true,
      lenMin: lenMin,
      lenMax: lenMax,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      lenMin: lenMin,
      lenMax: lenMax,
    },
  })
)

const validateUser = bodyUser => {
  const schema = Joi.object({
    name: Joi.string().min(lenMin).max(lenMax).required(),
    email: Joi.string().min(lenMin).max(lenMax).required().email(),
    password: Joi.string().min(lenMin).max(lenMax).required(),
  })
  // synchronous validate.
  return schema.validate(bodyUser)
  // asynchronous validate.
  // return schema.validate
  // schema.validateAsync(bodyUser)
}

exports.User = User
exports.validate = validateUser
