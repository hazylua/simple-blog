import React, { useState } from "react"
import uuid from "uuid"
import Item from "../components/item"
import Layout from "../components/layout"

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
    <Layout>
      <div
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "rgb(15, 15, 15)",
        }}
      ></div>
      <div>
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
    </Layout>
  )
}

export default PostBuilder
