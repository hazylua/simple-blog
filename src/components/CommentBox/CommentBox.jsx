import Axios from "axios"
import React, { useState, useEffect } from "react"
import { Remarkable } from "remarkable"

import axios from "axios"

import "./CommentBox.css"

const CommentList = ({ list }) => {
  const comments = list
  return (
    <div className="comment-list">
      {comments.map(comment => {
        return (
          <Comment key={comment.node.id} author={comment.node.author}>
            {comment.node.comment}
          </Comment>
        )
      })}
    </div>
  )
}

const CommentForm = () => {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const updateName = e => setName(e.target.value)
  const updateComment = e => setComment(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    const body = JSON.stringify({ name: name, comment: comment })
    const response = await fetch("localhost:4000/comment", {
      method: "post",
      body,
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await response.json()
    setName("")
    setComment("")
    console.log("done", body)
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

const Comment = ({ author, children }) => {
  const rawMarkup = () => {
    var md = new Remarkable()
    var rawMarkup = md.render(children.toString())
    return { __html: rawMarkup }
  }

  return (
    <div className="comment">
      <h4>Name: {author}</h4>
      {/* <p>Said: {comment}</p> */}
      <span dangerouslySetInnerHTML={rawMarkup()} />
    </div>
  )
}

const CommentBox = ({ location, comments }) => {
  useEffect(async () => {
    const data = await axios("http://localhost:4000/comment")
    console.log(data)
  }, [])

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
