import React from "react"

import "./styles/main.css"

const Main = ({ children }) => {
  return (
    <div className="main-container">
      <main className="main-box">
        {children}
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </main>
    </div>
  )
}

export default Main
