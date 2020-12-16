import React from "react"
import { Link, navigate } from "gatsby"

import PropTypes from "prop-types"
import _ from "lodash"

import { BiLogOut, BiPencil } from "react-icons/bi"
import { FaPencilAlt } from "react-icons/fa"

import { addSnackbar, leaveSession } from "src/store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Layout from "src/components/Layout"
import { PrivateRoute } from "src/components/Auth"

import "./styles/profile.css"

const Profile = ({ UserSession, actions }) => {
  const handleLogOut = () => {
    const { leaveSession } = actions
    leaveSession()
    navigate("/")
  }

  return (
    <>
      <PrivateRoute>
        <Layout>
          <div className="profile-container">
            <div className="profile__header border">
              <h2>Profile - {UserSession.user}</h2>
              <div className="profile__actions">
                <Link to="/postbuilder">
                  <span className="profile-icon">
                    <BiPencil size={30} />
                  </span>
                </Link>
                <a onClick={() => handleLogOut()}>
                  <span className="profile-icon">
                    <BiLogOut size={30} />
                  </span>
                </a>
              </div>
            </div>
            <div className="profile__body light-bg border">
              <p>Your username: {UserSession.user}</p>
              <p>Your e-mail: {UserSession.email}</p>
              <p>User status: {UserSession.admin ? "admin" : "regular user"}</p>
            </div>
          </div>
        </Layout>
      </PrivateRoute>
    </>
  )
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ leaveSession, addSnackbar }, dispatch),
})

Profile.propTypes = {
  actions: PropTypes.shape({
    leaveSession: PropTypes.func.isRequired,
    addSnackbar: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
