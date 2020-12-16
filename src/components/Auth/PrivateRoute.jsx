import React from "react"
import { navigate } from "gatsby"

import { connect } from "react-redux"

import { tokenCheck } from "src/services/user-auth"

const PrivateRoute = ({ UserSession, children }) => {
  const checkAuth = async () => {
    try {
      if (UserSession.auth) {
        const response = await tokenCheck()
        if (!response) {
          navigate("/")
          return null
        }
        return <div>{children}</div>
      }
      navigate("/")
      return null
    } catch (err) {
      navigate("/")
      return null
    }
  }

  if (checkAuth()) return <div>{children}</div>
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

export default connect(mapStateToProps, null)(PrivateRoute)
