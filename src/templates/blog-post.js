import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import axios from "axios"

import Layout from "src/components/Layout"
import CommentBox from "src/components/CommentBox"
import Serializer from "src/components/Serializer"

import "src/pages/styles/blog-post.css"

const PostTemplate = ({ pageContext }) => {
  const { title, author, content, date, comments } = pageContext
  console.log(comments)

  return (
    <Layout>
      <div className="post-container light-bg border">
        <div className="post__header">
          <h1>{title}</h1>
          <div className="post__info">
            <p>
              <b>Author:</b> {author}
            </p>
            <p>
              <b>Written on: {date}</b>
            </p>
          </div>
        </div>
        <div className="rule"></div>
        <div className="post__content">
          <Serializer value={content} />
        </div>
        <div className="post-space"></div>
        <div className="rule"></div>
        <div className="post__comments">
          <CommentBox location={title} comments={comments} />
        </div>
      </div>
    </Layout>
  )
}

// export const query = graphql`
//   query ContentQuery($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         title
//         date(formatString: "DD MMMM YYYY")
//         path
//         tags
//         excerpt
//       }
//     }
//   }
// `

export default PostTemplate
