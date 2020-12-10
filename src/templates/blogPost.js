import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import axios from "axios"

import Layout from "src/components/Layout"
import CommentBox from "src/components/CommentBox"
import Serializer from "src/components/Serializer"

import "src/pages/styles/blog-post.css"

const PostTemplate = ({ pageContext }) => {
  const { title, author, content, date, comments } = pageContext
  const dateFormat = new Date(date)
  console.log(comments)

  return (
    <Layout>
      <div className="post-container light-bg border">
        <div className="post__header">
          <h1>{title}</h1>
          <div className="post__info">
            <small>
              <p>
                <b>Author:</b> {author}
              </p>
              <p>
                <b>Written on:</b> {dateFormat.toLocaleDateString("pt-br")}
              </p>
            </small>
          </div>
        </div>

        <Serializer value={content} />
      </div>
    </Layout>
  )
}

export default PostTemplate
