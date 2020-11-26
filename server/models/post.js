const Joi = require("joi")
const mongoose = require("mongoose")

const { commentSchema } = require("../models/comment")

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: JSON,
    required: true,
  },
  comments: { type: [commentSchema] },
  hidden: Boolean,
})

const Post = mongoose.model("Blog", postSchema)

const validatePost = bodyPost => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.date().required(),
    body: Joi.object().required(),
  })
  return schema.validate(bodyPost)
}

exports.Post = Post
exports.validatePost = validatePost
