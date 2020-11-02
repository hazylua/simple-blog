import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import axios from "axios"

import Layout from "../components/Layout"
import CommentBox from "../components/CommentBox"

const Template = ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { title, author, date } = post.frontmatter

  const [comments, setComments] = useState([])

  const { next, prev } = pathContext

  useEffect(() => {
    async function fetchComments() {
      const comments = await axios.get("http://localhost:4000/comment")
      setComments(comments.data)
    }
    fetchComments()
  }, [comments])

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
              Author: {author != null ? { author } : "You"}
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
        <CommentBox
          location={title}
          comments={comments}
          setComments={setComments}
        />
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
  }
`

export default Template
