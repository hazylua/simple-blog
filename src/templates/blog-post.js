import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { addSnackbar } from "src/store/actions"

import Layout from "src/components/Layout"
import CommentBox from "src/components/CommentBox"
import Serializer from "src/components/Serializer"

import "src/pages/styles/blog-post.css"
import { commentsGetByPageTitle } from "src/services/blog-content"

const PostTemplate = ({ pageContext, actions, UserSession }) => {
  const { title, author, content, date } = pageContext
  const [comments, setComments] = useState([])

  useEffect(() => {
    const handleComments = async () => {
      try {
        const response = await commentsGetByPageTitle(title)
        const data = await response.data
        setComments(data)
      } catch (err) {
        if (err.response) console.log(err.response)
      }
    }
    handleComments()
  }, [title])

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
              <b>Written on:</b> {date}
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
          <CommentBox
            location={title}
            comments={comments}
            actions={actions}
            user={UserSession}
          />
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addSnackbar }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate)
