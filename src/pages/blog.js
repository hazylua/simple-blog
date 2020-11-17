import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Layout from "src/components/Layout"

import PageRow from "../components/PageRow"

import "./styles/blog.css"

const Post = ({ title, date, excerpt, path }) => {
  return (
    <div className="post-container">
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <p> Posted on: {date}</p>
      <Link to={path}>Read More</Link>
    </div>
  )
}

const PostList = ({ edges, maxResultsPerPage, postPage }) => {
  return (
    <div className="post-list">
      {edges
        .filter((item, i) => {
          return (
            i >= maxResultsPerPage * (postPage - 1) &&
            i < postPage * maxResultsPerPage
          )
        })
        .map(post => {
          const { title, date, excerpt, path } = post.node.frontmatter
          return (
            <Post
              key={`${date}__${title}`}
              title={title}
              date={date}
              excerpt={excerpt}
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

  const { edges } = data.allMarkdownRemark

  useEffect(() => {
    setPosts(edges)
  }, [])

  return (
    <Layout>
      <div className="blog_container light-bg border">
        <h2>Blog Posts</h2>
        <p>Check out my blog posts.</p>
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
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`

export default Blog
