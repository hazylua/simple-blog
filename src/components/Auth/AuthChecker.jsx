import React, { useEffect, useCallback } from "react"

import PropTypes from "prop-types"

import { Loading } from "../Loading"

import { authSession, leaveSession } from "src/store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { tokenCheck } from "src/services/user-auth"
import _ from "lodash"

import { signUser, logoutUser } from "./userActions"

const AuthChecker = ({ UserSession, actions, children }) => {
  const { authSession, leaveSession } = actions

  const getUser = useCallback(async () => {
    try {
      console.log("Callback")
      const response = await tokenCheck()
      const user_data = await response.data
      const date_expire = new Date(user_data.exp * 1000)
      signUser(
        {
          ..._.pick(user_data, ["user", "email", "admin"]),
          date_expire: date_expire,
        },
        authSession
      )
    } catch (err) {
      logoutUser(leaveSession)
    }
  }, [authSession, leaveSession])

  useEffect(() => {
    getUser()
  }, [getUser])

  return <>{UserSession.auth !== null ? children : <Loading />}</>
}

const mapStateToProps = state => ({
  UserSession: state.UserSession,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ authSession, leaveSession }, dispatch),
})

AuthChecker.propTypes = {
  actions: PropTypes.shape({
    authSession: PropTypes.func.isRequired,
    leaveSession: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthChecker)
