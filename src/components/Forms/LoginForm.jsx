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

const writeTokenToCookie = token => {
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

  const handleLogin = async credentials => {
    const { authSession } = actions
    console.log(credentials)
    try {
      const response = await userLogin(credentials)
      const token = response.data
      writeTokenToCookie(token)
      authSession(token, "User")
      notify("Logged in sucessfully.", actions)
      navigate("/")
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
