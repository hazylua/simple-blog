const Joi = require("joi")
const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mail: {
    type: String,
  },
  message: {
    // Change later, if using 'Slate'.
    type: String,
    required: true,
  },
})

const ContactForm = mongoose.model("ContactForm", formSchema)

const validateForm = bodyForm => {
  const schema = Joi.object({
    author: Joi.string().required(),
    date: Joi.date().required(),
    mail: Joi.string(),
    message: Joi.string().required(),
  })
  return schema.validate(bodyForm)
}

exports.ContactForm = ContactForm
exports.validateForm = validateForm
