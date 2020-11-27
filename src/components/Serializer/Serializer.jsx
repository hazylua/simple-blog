// Can be used like:
// {value.map(node => serialize(node))}
// Where value is a state with Slate values.

import React from "react"

const Serializer = ({ value }) => {
  const serialize = node => {
    if (Text.isText(node)) {
      let text = <>{node.text}</>
      if ("bold" in node && node["bold"] == true) text = <b>{text}</b>
      if ("italic" in node && node["italic"] == true) text = <i>{text}</i>
      return text
    }

    const children = node.children.map(n => [serialize(n)])

    switch (node.type) {
      case "paragraph":
        return <p>{children}</p>
      case "link":
        return <a href="${escapeHtml(node.url)}">{children}</a>
      default:
        return children
    }
  }
  return serialize(value)
}

export default Serializer
