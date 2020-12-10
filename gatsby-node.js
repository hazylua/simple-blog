const path = require("path")
const { default: Axios } = require("axios")

const getAllPosts = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/api/blog", {})
    const data = await response.data
    return data
  } catch (err) {
    console.log(err)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const PostTemplate = path.resolve("src/templates/blogPost.js")
  const postPathPrefix = "posts/"
  const pathFormat = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-]/g
  const { createPage } = actions
  const posts = await getAllPosts()
  posts.map(post => {
    const slug =
      postPathPrefix +
      post.title.toLowerCase().replace(/ /g, "-").replace(pathFormat, "")
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        title: post.title,
        date: post.date,
        author: post.author,
        content: post.body,
        comments: post.comments,
      },
    })
  })
}
