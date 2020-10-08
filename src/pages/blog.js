import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import PostBuilder from "../components/postbuilder"

import "../components/styles/main.css"

const Post = ({ title, date, excerpt, path, key }) => {
  return (
    <div key={key}>
      <Link to={path}>{title}</Link>
      &nbsp;
      <small>
        {" "}
        <em>published on</em> {date}
      </small>
      <p>{excerpt}</p>
      <br />
    </div>
  )
}

const PostList = ({ edges }) => {
  return (
    <div>
      <h3>Blog</h3>
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
        style={{ maxWidth: "1000px", margin: "auto", marginTop: "1.45rem" }}
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
