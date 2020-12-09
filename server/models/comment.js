const Joi = require("joi")
const mongoose = require("mongoose")

const collection_name = "comments"

const commentSchema = new mongoose.Schema(
  {
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
  },
  { collection: collection_name }
)

const Comment = mongoose.model("Comment", commentSchema)

const validateComment = bodyComment => {
  const schema = Joi.object({
    author: Joi.string().required(),
    date: Joi.date().required(),
    body: Joi.string().required(),
  })
  return schema.validate(bodyComment)
}

exports.commentSchema = commentSchema
exports.Comment = Comment
exports.validateComment = validateComment
