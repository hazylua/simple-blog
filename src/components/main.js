import React from "react"

import "./styles/main.css"

const Main = ({ children }) => {
  return (
    <div className="main-container">
      <main className="main-box">{children}</main>
    </div>
  )
}

export default Main
