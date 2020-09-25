import React from "react"

import "./styles/main.css"

const Main = ({ children }) => {
  return (
    <div className="main-container">
      <main className="main-box">
        <div className="main-posts">
          <h2>Posts</h2>

          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
        <div className="main-panel">
          <h3>Post History</h3>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Main
