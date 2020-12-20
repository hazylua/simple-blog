import React from "react"
import { Link, navigate } from "gatsby"

import PropTypes from "prop-types"

import { BiLogOut, BiPencil } from "react-icons/bi"

import { addSnackbar, leaveSession } from "src/store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Layout from "src/components/Layout"
import { PrivateRoute } from "src/components/Auth"

import { notify } from "src/services/snackbar-notify"
import { userLogout } from "src/services/user-auth"

import "./styles/profile.css"

const Profile = ({ UserSession, actions }) => {
  const handleLogOut = async () => {
    const { leaveSession } = actions
    try {
      const response = await userLogout()
      if (response) {
        notify(`Logged out.`, actions, "middle", 2000)
        leaveSession()
        navigate("/")
      }
    } catch (err) {
      notify(`An error happened.`, actions, "middle", 2000)
    }
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
                <span
                  id="logout"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleLogOut()}
                  onKeyDown={() => handleLogOut()}
                >
                  <span className="profile-icon">
                    <BiLogOut size={30} />
                  </span>
                </span>
              </div>
            </div>
            <div className="profile__body light-bg border">
              <h2 className="user-info">User Information</h2>
              <p>
                <b>Your username</b>: {UserSession.user}
              </p>
              <p>
                <b>Your e-mail</b>: {UserSession.email}
              </p>
              <p>
                <b>User status</b>:{" "}
                {UserSession.admin
                  ? "is an administrator."
                  : "is a regular user"}
              </p>
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
  UserSession: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    leaveSession: PropTypes.func.isRequired,
    addSnackbar: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
