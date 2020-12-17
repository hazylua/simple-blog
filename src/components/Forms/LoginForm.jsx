import React, { useState } from "react"
import { navigate } from "gatsby"

import { userLogin } from "src/services/user-auth"

import { notify } from "src/services/snackbar-notify"

import "./LoginForm.css"

const LoginForm = ({ actions }) => {
  const [loginBody, setLoginBody] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async credentials => {
    const { authSession } = actions

    try {
      const response = await userLogin(credentials)
      const user_data = await response.data
      authSession(
        user_data.user,
        user_data.email,
        user_data.admin,
        user_data.date_expire
      )
      notify("Logged in sucessfully.", actions, "middle", 2000)
      navigate("/")
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions, "middle", 2000)
      else console.log(err)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login__header">Login</div>
      <div className="login__body">
        <form className="login-form">
          Your e-mail address:
          <input
            type="text"
            onChange={e =>
              setLoginBody({ ...loginBody, email: e.target.value })
            }
          />
          Your password:
          <input
            type="password"
            onChange={e =>
              setLoginBody({ ...loginBody, password: e.target.value })
            }
          />
          <br />
        </form>
        <button
          className="login__submit"
          onClick={() => handleLogin(loginBody)}
        >
          Log In
        </button>
      </div>
    </div>
  )
}

export default LoginForm
