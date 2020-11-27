const { Post, validatePost } = require("../models/post")
const express = require("express")
const _ = require("lodash")
const router = express.Router()

router.post("/", async (req, res) => {
  // Check for errors.
  const { err } = validatePost(req.body)
  if (err) {
    return res.status(400).send(err.details[0].message)
  }
  try {
    let post = new Post(_.pick(req.body, ["title", "author", "date", "body"]))

    await post.save()

    res.send(_.pick(post, ["_id", "title", "date"]))
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

module.exports = router
