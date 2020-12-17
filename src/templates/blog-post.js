import React from "react"

import Layout from "src/components/Layout"
import CommentBox from "src/components/CommentBox"
import Serializer from "src/components/Serializer"

import "src/pages/styles/blog-post.css"

const PostTemplate = ({ pageContext }) => {
  const { title, author, content, date, comments } = pageContext

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

export default PostTemplate
