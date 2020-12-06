import React from "react"
import { Link } from "gatsby"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { authSession } from "src/store/actions"

import { findCookie } from "src/common/cookies"

import "./Navbar.css"

import { GrLogin } from "react-icons/gr"
import { FaUser } from "react-icons/fa"

const Navbar = ({ UserSession, actions }) => {
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

      {UserSession.auth == true ? (
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

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ authSession }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
