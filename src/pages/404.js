import { Link } from "gatsby"
import React from "react"

import "./styles/404.css"

const NotFoundPage = () => (
  <div className="not-found">
    <h1>404 error.</h1>
    <h1>Page not found!</h1>
    <p>
      <Link to="/">Click here to go back to the homepage.</Link>
    </p>
  </div>
)

export default NotFoundPage
