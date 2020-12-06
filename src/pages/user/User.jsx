import { authSession } from "src/store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import axios from "axios"
import Footer from "src/components/Footer"
import Navbar from "src/components/Navbar"
import React, { useState } from "react"

import "./User.css"

const writeTokenCookie = token => {
  // In hours.
  const expireTime = 2
  var date = new Date()
  date.setTime(+date + expireTime * 3600000)

  document.cookie =
    "token=" +
    token +
    ";expires=" +
    date.toGMTString() +
    ";path=/" +
    ";SameSite=None" +
    ";Secure"
}

const LoginForm = ({ actions }) => {
  const [loginBody, setLoginBody] = useState({
    email: "",
    password: "",
  })

  const loginUser = async credentials => {
    const { authSession } = actions
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth`,
        credentials
      )
      const token = response.data
      writeTokenCookie(token)
      authSession(token, "User")
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login__header">Login</div>
      <div className="login__body">
        <form className="login-form">
          Your e-mail address:
          <input
            label="email"
            type="text"
            onChange={e =>
              setLoginBody({ ...loginBody, email: e.target.value })
            }
          />
          Your password:
          <input
            label="pw"
            type="password"
            onChange={e =>
              setLoginBody({ ...loginBody, password: e.target.value })
            }
          />
          <br />
        </form>
        <button className="login__submit" onClick={() => loginUser(loginBody)}>
          Submit
        </button>
      </div>
    </div>
  )
}

const RegisterForm = ({ actions }) => {
  const [registerBody, setRegisterBody] = useState({
    name: "",
    email: "",
    password: "",
  })

  const registerUser = async credentials => {
    try {
      await axios.post(`http://localhost:5000/api/user`, credentials)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register__header">Register</div>
      <div className="register__body">
        <form className="register-form">
          Your username:
          <input
            label="username"
            type="text"
            onChange={e =>
              setRegisterBody({
                ...registerBody,
                name: e.target.value,
              })
            }
          />
          Your e-mail address:
          <input
            label="email"
            type="text"
            onChange={e =>
              setRegisterBody({
                ...registerBody,
                email: e.target.value,
              })
            }
          />
          Your password:
          <input
            label="pw"
            type="password"
            onChange={e =>
              setRegisterBody({
                ...registerBody,
                password: e.target.value,
              })
            }
          />
        </form>
        <button
          className="register__submit"
          onClick={() => registerUser(registerBody)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const User = ({ actions }) => {
  return (
    <>
      <Navbar />
      <div className="auth-container light-bg border box-shadow">
        <h2>User Page</h2>
        <div className="user-container">
          <LoginForm actions={actions} />
          <div className="sep" />
          <RegisterForm actions={actions} />
        </div>
      </div>

      <Footer />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ authSession }, dispatch),
})

export default connect(null, mapDispatchToProps)(User)
