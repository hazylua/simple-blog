import React, { useState } from "react"
import uuid from "uuid"
import Item from "./item"

const PostBuilder = () => {
  const [items, setItems] = useState([
    {
      type: null,
      content: "",
      id: uuid(),
    },
  ])

  const addItem = (type, content) => {
    setItems(state => [...state, { type, content, id: uuid() }])
  }
  const updateItem = (id, newContent) => {
    setItems(state => {
      const itemIndex = state.findIndex(item => item.id === id)
      const newState = [...state]
      newState[itemIndex].content = newContent
      return newState
    })
  }

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      addItem(null, "")
    }
  }

  return (
    <div className="post">
      {items.map(item => (
        <Item
          key={item.id}
          type={item.type}
          content={item.content}
          updateItem={newContent => updateItem(item.id, newContent)}
          handleKeyPress={handleKeyPress}
        />
      ))}
    </div>
  )
}

export default PostBuilder
