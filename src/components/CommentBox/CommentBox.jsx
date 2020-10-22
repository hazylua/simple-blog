import React from "react"

import "./CommentBox.css"

const CommentList = () => {
  return <div className="comment-list"></div>
}

const CommentForm = () => {
  return (
    <div>
      <form className="comment-form">
        <input className="comment-form__name" placeholder="Name"></input>
        <textarea
          className="comment-form__comment"
          placeholder="Comment"
        ></textarea>
      </form>
    </div>
  )
}

const Comment = () => {
  return <div className="comment"></div>
}

const CommentBox = ({ location }) => {
  return (
    <div className="comment-box">
      <h3>Comments</h3>
      <CommentForm />
    </div>
  )
}
export default CommentBox
