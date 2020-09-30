import React from "react"

import { Link } from "gatsby"

import "./styles/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <Link className="navbar-link" activeClassName="active-link" to="/">
        Home
      </Link>
      <span className="navbar-separator">/</span>
      <Link className="navbar-link" activeClassName="active-link" to="/blog">
        Blog
      </Link>
      <span className="navbar-separator">/</span>
      <Link className="navbar-link" activeClassName="active-link" to="/merch">
        Merch
      </Link>
      <span className="navbar-separator">/</span>
      <Link className="navbar-link" activeClassName="active-link" to="/about">
        About
      </Link>
      <span className="navbar-separator">/</span>
      <Link className="navbar-link" activeClassName="active-link" to="/contact">
        Contact
      </Link>
      <span className="navbar-separator">/</span>
    </nav>
  )
}

export default Navbar
