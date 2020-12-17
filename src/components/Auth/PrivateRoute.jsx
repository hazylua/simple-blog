import React from "react"
import { navigate } from "gatsby"

import { addSnackbar, leaveSession } from "src/store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { tokenCheck } from "src/services/user-auth"
import { notify } from "src/services/snackbar-notify"

const PrivateRoute = ({ UserSession, actions, children }) => {
  const checkAuth = async () => {
    const { leaveSession, addSnackbar } = actions
    try {
      if (UserSession.auth) {
        const response = await tokenCheck()
        if (!response) {
          leaveSession()
          notify("No auth.", addSnackbar, "middle", 2000)
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
  else return null
  // return <>{checkAuth() ? <div>{children}</div> : <span>Loading...</span>} </>
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ leaveSession, addSnackbar }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
