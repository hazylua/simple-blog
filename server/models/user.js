const Joi = require("joi")
const mongoose = require("mongoose")

const lenMin = 5
const lenMax = 255

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: lenMin,
    maxlength: lenMax,
  },
  email: {
    type: String,
    required: true,
    minlength: lenMin,
    maxlength: lenMax,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: lenMin,
    maxlength: lenMax,
  },
})

const User = mongoose.model("User", userSchema)

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

const validateRequest = req => {
  const schema = Joi.object({
    email: Joi.string().min(lenMin).max(lenMax).required().email(),
    password: Joi.string().min(lenMin).max(lenMax).required(),
  })

  return schema.validate(req)
}

exports.User = User
exports.validateUser = validateUser
exports.validateRequest = validateRequest
