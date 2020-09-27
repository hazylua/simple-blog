import React from "react"

import "./styles/main.css"

const contrastColor = "#03fc49"

const testStyle = {
  border: `3px solid ${contrastColor}`,
}

const Main = ({ children }) => {
  return (
    <div className="main-container" style={testStyle}>
      <main className="main-box">{children}</main>
    </div>
  )
}

export default Main
