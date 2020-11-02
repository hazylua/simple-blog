import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"

// import PostBuilder from "./postbuilder"
import PageRow from "../components/PageRow"

import "../components/Main/Main.css"

const Post = ({ title, date, excerpt, path }) => {
  return (
    <div
      style={{
        borderBottom: "1px dotted rgb(15, 15, 15)",
        marginBottom: "1.45rem",
        paddingBottom: "1rem",
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "rgb(15, 15, 15)" }}>
        {title}
      </h3>

      <p>
        <small>
          <em>Published on</em> {date}
        </small>
        <br />
        {excerpt}
      </p>
      <Link
        to={path}
        style={{
          textDecoration: "none",
          color: "rebeccapurple",
        }}
      >
        Read More
      </Link>
    </div>
  )
}

const PostList = ({ edges, maxResultsPerPage, postPage }) => {
  return (
    <div>
      <div
        style={{
          borderBottom: "2px solid rgb(15, 15, 15)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "1.45rem",
          paddingBottom: "1.45rem",
        }}
      >
        <h3 style={{ margin: "0" }}>Blog</h3>
        <Link to="/postbuilder">
          <h3 style={{ margin: "0" }}>Add Post</h3>
        </Link>
      </div>
      <div>
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
                title={title}
                date={date}
                excerpt={excerpt}
                key={`${date}__${title}`}
                path={path}
              />
            )
          })}
      </div>
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
      <div
        className="container"
        style={{ maxWidth: "80%", margin: "auto", marginTop: "1.45rem" }}
      >
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
