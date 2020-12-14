import { authSession, addSnackbar } from "src/store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import React from "react"

import Navbar from "src/components/Navbar"
import { LoginForm, RegisterForm } from "src/components/Forms"
import Footer from "src/components/Footer"

import "./styles/user.css"

const User = ({ actions }) => {
  return (
    <>
      <Navbar />
      <div className="spacer">
        <div className="auth-container light-bg border">
          <div className="user-container">
            <LoginForm actions={actions} />
            <div className="sep" />
            <RegisterForm actions={actions} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ authSession, addSnackbar }, dispatch),
})

export default connect(null, mapDispatchToProps)(User)
