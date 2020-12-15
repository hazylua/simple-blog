import React, { useState } from "react"
import { navigate } from "gatsby"

import { userLogin } from "src/services/user-auth"

import "./LoginForm.css"

const notify = (status, actions) => {
  const { addSnackbar } = actions
  const options = {
    message: status,
    style: "middle",
    displayTime: 2000,
  }
  addSnackbar(options)
}

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

      authSession(user_data.user, user_data.email, user_data.admin)
      notify("Logged in sucessfully.", actions)
      // navigate("/")
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions)
      else console.log(err.response)
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
