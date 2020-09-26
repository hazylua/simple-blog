import React from "react"

import { Link } from "gatsby"

import "./styles/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-box">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/merch">Merch</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
