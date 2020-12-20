import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Layout from "src/components/Layout"

import PageRow from "../components/PageRow"

import "./styles/blog.css"

const Post = ({ title, author, date, path }) => {
  return (
    <div className="posts-container">
      <h3>{title}</h3>
      <div className="posts-info">
        <p>
          <i>Author</i>: {author}
        </p>
        <p>
          <i>From</i>: {date}
        </p>
      </div>
      <Link to={path}>Read More</Link>
    </div>
  )
}

const PostList = ({ edges, maxResultsPerPage, postPage }) => {
  return (
    <div className="posts-list">
      {edges
        .filter((item, i) => {
          return (
            i >= maxResultsPerPage * (postPage - 1) &&
            i < postPage * maxResultsPerPage
          )
        })
        .map(post => {
          const { title, date, author } = post.node.context
          const { path } = post.node

          return (
            <Post
              key={`${date}__${title}`}
              title={title}
              date={date}
              author={author}
              path={path}
            />
          )
        })}
    </div>
  )
}

const Blog = ({ data }) => {
  const [postsPage, setPostsPage] = useState(1)
  const [posts, setPosts] = useState([])
  const maxResultsPerPage = 5

  const { edges } = data.allSitePage

  useEffect(() => {
    // console.log("Blog page.")
    setPosts(edges)
  }, [edges])

  return (
    <Layout>
      <div className="blog-container light-bg border">
        <h2>Blog Posts</h2>
        <p>Check out my blog posts below!</p>
        <div className="rule"></div>
        <PostList
          edges={posts}
          maxResultsPerPage={maxResultsPerPage}
          postPage={postsPage}
        />
        <PageRow
          maxResultsPerPage={maxResultsPerPage}
          itemsNum={posts.length}
          setPage={setPostsPage}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostsQuery {
    allSitePage(filter: { path: { regex: "/posts/" } }) {
      edges {
        node {
          id
          path
          context {
            slug
            title
            date
            author
          }
        }
      }
    }
  }
`

export default Blog
