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
      }}
    >
      <Link
        to={path}
        style={{
          textDecoration: "none",
          color: "rebbecapurple",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>{title}</h3>
      </Link>

      <p>
        <small>
          <em>Published on</em> {date}
        </small>
        <br />
        {excerpt}
      </p>
    </div>
  )
}

const PostList = ({ edges }) => {
  return (
    <div>
      <h3
        style={{
          marginBottom: "1.45rem",
          paddingBottom: "1.45rem",
          borderBottom: "2px solid rgb(15, 15, 15)",
        }}
      >
        Blog
      </h3>
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
