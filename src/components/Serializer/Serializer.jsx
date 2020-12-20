// Can be used like:
// {value.map(node => serialize(node))}
// Where value is a state with Slate values.

import React from "react"
import { Text } from "slate"
import { v4 as uuidv4 } from "uuid"

const Serializer = ({ value }) => {
  const serialize = node => {
    if (Text.isText(node)) {
      let text = node.text
      if ("bold" in node && node["bold"] === true)
        text = <b key={uuidv4()}>{text}</b>
      if ("italic" in node && node["italic"] === true)
        text = <i key={uuidv4()}>{text}</i>
      return text
    }

    const children = node.children.map(n => [serialize(n)])

    switch (node.type) {
      case "paragraph":
        return <p key={uuidv4()}>{children}</p>
      case "link":
        return <a href={node.url}>{children}</a>
      default:
        return children
    }
  }

  return <div>{value.map(node => serialize(node))}</div>
}

export default Serializer
