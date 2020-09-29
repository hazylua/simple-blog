import React, { useRef, useEffect } from "react"

const Item = ({ type, content, updateItem, handleKeyPress }) => {
  const textBox = useRef()

  useEffect(() => {
    textBox.current.focus()
  })

  return (
    <div>
      {!type ? (
        <textarea
          ref={textBox}
          style={{
            border: "none",
            outline: "none",
            resize: "none",
            width: "100%",
            fontSize: "inherit",
          }}
          value={content}
          onChange={e => updateItem(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <p>A new item.</p>
      )}
    </div>
  )
}

export default Item
