import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import PostBuilder from "../components/postbuilder"

import "../components/styles/main.css"

const Post = ({ title, date, excerpt, path, key }) => {
  return (
    <div
      key={key}
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
          color: "rebbecapurple",
        }}
      >
        Read More
      </Link>
    </div>
  )
}

const PostList = ({ edges }) => {
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
        {edges.map(post => {
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
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: "80%", margin: "auto", marginTop: "1.45rem" }}
      >
        <PostList edges={edges} />
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
