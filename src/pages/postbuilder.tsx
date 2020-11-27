import React, { useCallback, useMemo, useState } from "react"

import axios from "axios"

import isHotkey from "is-hotkey"
import { Editable, withReact, Slate } from "slate-react"
import { Editor, createEditor, Node, Text } from "slate"
import { withHistory } from "slate-history"

import Layout from "src/components/Layout"
import Snackbar from "src/components/Snackbar"

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

const PostBuilder = () => {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState<Node[]>(initialValue)
  const [notification, setNotification] = useState({
    pending: false,
    message: "",
  })

  const setPending = () => {
    setNotification({ ...notification, pending: false })
  }

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const newPost = async post => {
    try {
      const response = await axios.post(`http://localhost:5000/api/blog`, post)
      setNotification({ pending: true, message: `Post submitted succesfully.` })
    } catch (err) {
      if (!err.response.data.message) {
        setNotification({
          pending: true,
          message: `An error has occurred. Please try again.`,
        })
      } else {
        setNotification({
          pending: true,
          message: `${err.response.data.message}`,
        })
      }
    }
  }

  return (
    <Layout>
      <div className="edit-area">
        <div>
          <input
            className="post__title"
            placeholder="Your title here."
            onChange={e => setTitle(e.target.value)}
          />
          <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
          >
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
          </Slate>
        </div>
        <button
          className="post__submit"
          onClick={() =>
            newPost({
              title: title,
              author: "No one",
              date: Date.now,
              body: value,
            })
          }
        >
          Post
        </button>
      </div>
      <Snackbar
        setPending={setPending}
        top={"10px"}
        left={"50%"}
        transform={"translateX(-50%)"}
        displayTime={3000}
        mount={notification.pending}
      >
        {notification.message}
      </Snackbar>
    </Layout>
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

export default PostBuilder
