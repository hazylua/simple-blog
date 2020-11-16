import React from "react"

import { Link } from "gatsby"

import SearchBar from "src/components/SearchBar"

import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="links-wrapper">
        <Link className="navbar-link" activeClassName="active-link" to="/">
          Home
        </Link>
        <span className="navbar-separator">/</span>
        <Link className="navbar-link" activeClassName="active-link" to="/blog">
          Blog
        </Link>
        <span className="navbar-separator">/</span>
        <Link className="navbar-link" activeClassName="active-link" to="/about">
          About
        </Link>
        <span className="navbar-separator">/</span>
        <Link
          className="navbar-link"
          activeClassName="active-link"
          to="/contact"
        >
          Contact
        </Link>
        <span className="navbar-separator">/</span>
      </div>
      <SearchBar />
    </nav>
  )
}

export default Navbar
