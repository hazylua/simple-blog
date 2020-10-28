import React, { useState, useEffect } from "react"

import "./CommentBox.css"

const CommentList = ({ list }) => {
  const comments = list
  return (
    <div className="comment-list">
      {comments.map(comment => {
        return (
          <Comment
            key={comment.node.id}
            author={comment.node.author}
            comment={comment.node.comment}
          ></Comment>
        )
      })}
    </div>
  )
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

const Comment = ({ author, comment }) => {
  return (
    <div className="comment">
      <h4>Name: {author}</h4>
      <p>Said: {comment}</p>
    </div>
  )
}

const CommentBox = ({ location, comments }) => {
  console.log(comments)
  return (
    <div className="comment-box">
      <h3>
        Comments - "<b>{location}</b>"
      </h3>
      <p>Post your thoughts about this post!</p>
      <CommentForm />
      <CommentList list={comments} />
    </div>
  )
}

export default CommentBox
