import axios from "axios"
import React, { useState } from "react"
import { Remarkable } from "remarkable"

import "./CommentBox.css"

const CommentList = ({ list }) => {
  const comments = list
  return (
    <div className="comment-list">
      {comments.length > 0 ? (
        comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              author={comment.name}
              timestamp={comment.timestamp}
            >
              {comment.comment}
            </Comment>
          )
        })
      ) : (
        <div className="comment-list-empty">
          <h4>Nothing here so far...</h4>
        </div>
      )}
    </div>
  )
}

const CommentForm = ({ update }) => {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const updateName = e => setName(e.target.value)
  const updateComment = e => setComment(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const body = { name: name, comment: comment }
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/comment",
        data: body,
      })
      const data = await response
      update(data)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="comment-form__name"
          placeholder="Name"
          onChange={updateName}
        ></input>
        <textarea
          className="comment-form__comment"
          placeholder="Comment"
          onChange={updateComment}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  )
}

const Comment = ({ author, children, timestamp }) => {
  return (
    <div className="comment">
      <h4 className="comment__author">Name: {author}</h4>
      <small className="comment__timestamp">{timestamp}</small>
      <div>{children}</div>
    </div>
  )
}

const CommentBox = ({ location, comments, setComments }) => {
  return (
    <div className="comment-box">
      <h3>
        Comments - "<b>{location}</b>"
      </h3>
      <p>Post your thoughts about this post!</p>
      <CommentForm update={setComments} />
      <CommentList list={comments} />
    </div>
  )
}

export default CommentBox
