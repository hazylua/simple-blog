import React, { useCallback, useMemo, useState } from "react"

import PropTypes from "prop-types"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { addSnackbar } from "../store/actions"

import isHotkey from "is-hotkey"
import { Editable, withReact, Slate } from "slate-react"
import { Editor, createEditor, Node } from "slate"
import { withHistory } from "slate-history"

import Navbar from "../components/Navbar"
import { PrivateRoute } from "../components/Auth"

import { postSubmit } from "../services/blog-content"
import { notify } from "../services/snackbar-notify"

import "./styles/postbuilder.css"

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
}

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true, underline: true },
      { text: " text!", italic: true },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
]

const PostBuilder = ({ UserSession, actions }) => {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState<Node[]>(initialValue)

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const handlePost = async () => {
    try {
      const postBody = {
        title: title,
        author: UserSession.user,
        date: new Date(),
        body: value,
      }
      const response = await postSubmit(postBody)
      console.log(response.data)
      notify("Post submitted.", actions, "middle", 2000)
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions, "middle", 2000)
      else
        notify(
          "No response from the server. Try again later.",
          actions,
          "middle",
          2000
        )
    }
  }

  return (
    <PrivateRoute>
      <Navbar />
      <div className="edit-area">
        <div>
          <div className="post__title">
            <input
              placeholder="Your title here."
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
          >
            <div className="post__editor">
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={event => {
                  for (const hotkey in HOTKEYS) {
                    if (isHotkey(hotkey, event as any)) {
                      event.preventDefault()
                      const mark = HOTKEYS[hotkey]
                      toggleMark(editor, mark)
                    }
                  }
                }}
              />
            </div>
          </Slate>
        </div>
        <button className="post__submit" onClick={() => handlePost()}>
          Post
        </button>
      </div>
    </PrivateRoute>
  )
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>
    case "list-item":
      return <li {...attributes}>{children}</li>
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addSnackbar }, dispatch),
})

PostBuilder.propTypes = {
  actions: PropTypes.shape({
    addSnackbar: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBuilder)
