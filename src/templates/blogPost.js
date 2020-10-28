import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import CommentBox from "../components/CommentBox"

const Template = ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { title, author, date, excerpt } = post.frontmatter

  const comments = data.allCommentsJson.edges

  const { next, prev } = pathContext

  return (
    <Layout>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        style={{ maxWidth: "80%", margin: "auto", marginTop: "1.45rem" }}
      >
        <h1 style={{ marginBottom: "1rem" }}>{title}</h1>
        <br />
        <div>
          <p>
            <em>
              Author: {author}
              <br />
              Publish date: {date}
              <br />
            </em>
          </p>
        </div>

        <br />
        <div
          className="blogpost"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div>
          <p>
            {prev && (
              <Link to={prev.frontmatter.path}>
                {prev.frontmatter.title} ← Previous
              </Link>
            )}
          </p>
          <p>
            {next && (
              <Link to={next.frontmatter.path}>
                Next →{next.frontmatter.title}
              </Link>
            )}
          </p>
        </div>
        <CommentBox location={title} comments={comments} />
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query ContentQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        path
        tags
        excerpt
      }
    }
    allCommentsJson {
      edges {
        node {
          id
          author
          comment
        }
      }
    }
  }
`

// query CommentsQuery {
//   allCommentsJson {
//     edges {
//       node {
//         id
//         author
//         comment
//       }
//     }
//   }
// }

export default Template
