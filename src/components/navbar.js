import React from "react"

import { Link } from "gatsby"

import "./styles/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-box">
        <Link activeClassName="active-link" to="/">
          Home
        </Link>
        <Link activeClassName="active-link" to="/blog">
          Blog
        </Link>
        <Link activeClassName="active-link" to="/merch">
          Merch
        </Link>
        <Link activeClassName="active-link" to="/about">
          About
        </Link>
        <Link activeClassName="active-link" to="/contact">
          Contact
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
