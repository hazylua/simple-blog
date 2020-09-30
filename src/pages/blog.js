import React from "react"
import Layout from "../components/layout"
import PostBuilder from "../components/postbuilder"

import "../components/styles/main.css"

const Blog = () => {
  return (
    <Layout>
      <div
        className="box"
        style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}
      >
        <h3 className="box__title">My Blog</h3>
        <div className="box__body">
          <PostBuilder></PostBuilder>
        </div>
        <button style={{ width: "120px" }}>Add Post</button>
      </div>
    </Layout>
  )
}

export default Blog
