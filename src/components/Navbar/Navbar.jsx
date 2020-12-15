import React from "react"
import { Link } from "gatsby"

// import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import "./Navbar.css"

import { BiLogIn } from "react-icons/bi"
import { FaUser } from "react-icons/fa"

const ProfileIcon = () => {
  return (
    <Link className="user-icon" to="/profile">
      <FaUser size={25} />
    </Link>
  )
}

const EnterIcon = () => {
  return (
    <Link className="user-icon" to="/user">
      <BiLogIn size={25} />
    </Link>
  )
}

const Navbar = ({ UserSession }) => {
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
        {UserSession.auth == true ? <ProfileIcon /> : <EnterIcon />}
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({ authSession }, dispatch),
// })

export default connect(mapStateToProps, null)(Navbar)
