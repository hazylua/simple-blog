const { Post } = require("../models/post")
const _ = require("lodash")

const postAdd = async (req, res) => {
  try {
    let title = await Post.findOne({ title: req.body.title })
    if (title) {
      return res
        .status(400)
        .send("Post title already exists. Please choose another title.")
    } else {
      const post_info = _.pick(req.body, ["title", "author", "date", "body"])
      var post = new Post(post_info)
      await post.save()
      res.send(_.pick(post, ["_id", "title", "date"]))
    }
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

const postGetAll = async (req, res) => {
  const posts = await Post.find({})
  res.send(posts)
}

module.exports = {
  postAdd: postAdd,
  postGetAll: postGetAll,
}
