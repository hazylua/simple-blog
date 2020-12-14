const path = require("path")
const axios = require("axios").default

const api = () => {
  return axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 5000,
  })
}

const getAllBlogPosts = async () => {
  try {
    const response = await api().get("/blog/content")
    const data = await response.data
    return data
  } catch (err) {
    if (err.response) {
      console.log(err.response.data)
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const PostTemplate = path.resolve("src/templates/blog-post.js")

  const posts = await getAllBlogPosts()

  let paths = []
  const postPathPrefix = "posts/"
  const pathFormat = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-]/g

  posts.map(post => {
    const slug =
      postPathPrefix +
      post.title.toLowerCase().replace(/ /g, "-").replace(pathFormat, "")
    const date = new Date(post.date).toLocaleDateString("pt-br")

    if (!paths.find(i => i == slug)) {
      paths.push(slug)
      createPage({
        path: slug,
        component: PostTemplate,
        context: {
          slug: slug,
          date: date,
          title: post.title,
          author: post.author,
          content: post.body,
          comments: post.comments,
        },
      })
    } else {
      console.error(
        "Path already exists. No duplicate post names are allowed. Check server."
      )
    }
  })
}
