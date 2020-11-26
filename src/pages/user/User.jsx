import React, { useState } from "react"

import axios from "axios"

import Navbar from "src/components/Navbar"
import Footer from "src/components/Footer"

import "./User.css"

const writeTokenCookie = token => {
  // In hours.
  const expireTime = 2
  var date = new Date()
  date.setTime(+date + expireTime * 3600000)

  document.cookie =
    "token=" + token + ";expires=" + date.toGMTString() + ";path=/"
  console.log(token)
}

const PasswordChecker = ({ compare }) => {
  const [password, setPassword] = useState("")
  const [errorStyle, setErrorStyle] = useState({
    transition: "all 500ms ease",
    borderColor: "none",
  })

  return (
    <React.Fragment>
      Please check your password:
      <input
        id="pwcheck"
        type="password"
        style={errorStyle}
        onChange={e => setPassword(e.target.value)}
        onBlur={() =>
          compare !== password
            ? setErrorStyle({ ...errorStyle, borderColor: "red" })
            : setErrorStyle({
                ...errorStyle,
                borderColor: "var(--color-primary-light)",
              })
        }
      />
    </React.Fragment>
  )
}

const LoginForm = () => {
  const [loginBody, setLoginBody] = useState({
    email: "",
    password: "",
  })

  const loginUser = async credentials => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth`,
        credentials
      )
      const token = response.data
      writeTokenCookie(token)
    } catch (err) {
      alert(err)
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
          <PasswordChecker compare={loginBody.password} />
        </form>
        <button className="login__submit" onClick={() => loginUser(loginBody)}>
          Submit
        </button>
      </div>
    </div>
  )
}

const RegisterForm = () => {
  const [registerBody, setRegisterBody] = useState({
    name: "",
    email: "",
    password: "",
  })

  const registerUser = async credentials => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users`,
        credentials
      )
      // ...
      console.log(response)
    } catch (err) {
      alert(err)
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
          <PasswordChecker compare={registerBody.password} />
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

const User = () => {
  return (
    <>
      <Navbar />
      <div className="auth-container light-bg border box-shadow">
        <h2>User Page</h2>
        <div className="user-container">
          <LoginForm />
          <div className="sep" />
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default User
