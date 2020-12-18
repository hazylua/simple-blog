import React, { useState } from "react"

import { notify } from "src/services/snackbar-notify"
import { commentSubmit } from "src/services/blog-content"

import { v4 as uuidv4 } from "uuid"

import "./CommentBox.css"

const CommentList = ({ list }) => {
  const comments = list
  return (
    <div className="comment-list border">
      {comments.length > 0 ? (
        comments.map(comment => {
          return (
            <Comment
              key={uuidv4()}
              author={comment.author}
              timestamp={comment.date}
            >
              {comment.body}
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

const CommentForm = ({ actions, user, title }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const commentBody = {
        title: title,
        author: user.user,
        date: new Date(),
        body: comment,
      }
      const response = await commentSubmit(commentBody)
      console.log(response)
      notify(`Comment submitted.`, actions, "middle", 2000)
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions, "middle", 2000)
    }
  }

  return (
    <div>
      <form className="comment-form">
        {/* <input
          className="comment-form__name"
          onChange={e => setName(e.target.value)}
        /> */}
        {user.auth ? (
          <p>
            <b>User:</b> {user.user}
          </p>
        ) : (
          <p className="disabled">
            You must login before commenting on a post.
          </p>
        )}
        <textarea
          disabled={!user.auth}
          className="comment-form__comment"
          placeholder="Write something here!"
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </form>
      <button disabled={!user.auth} onClick={e => handleSubmit(e)}>
        Submit
      </button>
    </div>
  )
}

const Comment = ({ author, children, timestamp }) => {
  return (
    <div className="comment">
      <div className="comment__header">
        <p className="comment__author">{author}:</p>
        <small className="comment__timestamp">
          {new Date(timestamp).toLocaleString("pt-br")}
        </small>
      </div>
      <div className="comment__body">{children}</div>
    </div>
  )
}

const CommentBox = ({ location, comments, actions, user }) => {
  return (
    <div className="comment-box">
      <div className="comment-box__header">
        <h3>
          Comments - "<b>{location}</b>"
        </h3>
        <p>Post your thoughts below!</p>
      </div>
      <div className="comment-box__body">
        <CommentForm title={location} actions={actions} user={user} />
        <CommentList list={comments} />
      </div>
    </div>
  )
}

export default CommentBox
