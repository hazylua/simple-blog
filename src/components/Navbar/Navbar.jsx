import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { authSession } from "src/store/actions"

import "./Navbar.css"

import { BiLogIn } from "react-icons/bi"
import { FaUser, FaAppStore } from "react-icons/fa"

const ProfileIcon = () => {
  return (
    <Link className="user-link" to="/profile">
      <FaUser />
    </Link>
  )
}

const EnterIcon = () => {
  return (
    <Link className="user-link" to="/user">
      <BiLogIn />
    </Link>
  )
}

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

      {UserSession.auth == true ? <ProfileIcon /> : <EnterIcon />}
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
