import React from "react"

import { Link } from "gatsby"

import { GrLogin } from "react-icons/gr"
import { FaUser } from "react-icons/fa"

import "./Navbar.css"

import { findCookie } from "src/common/cookies"

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

      {findCookie("token") != "" ? (
        <Link className="user-link" to="/profile">
          <FaUser />
        </Link>
      ) : (
        <Link className="user-link" to="/user">
          <GrLogin />
        </Link>
      )}
    </nav>
  )
}

export default Navbar
