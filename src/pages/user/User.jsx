import React, { useState } from "react"

import axios from "axios"

import "./User.css"

const register = async credentials => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/users`,
      credentials
    )
  } catch (err) {
    alert(err)
  }
}

const login = async credentials => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth`,
      credentials
    )
  } catch (err) {
    alert(err)
  }
}

const PasswordChecker = ({ compare }) => {
  const [password, setPassword] = useState("")
  const [errorStyle, setErrorStyle] = useState({})
  // const errorStyle = {
  //   borderColor: "red",
  // }

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
            ? setErrorStyle({ borderColor: "red" })
            : setErrorStyle({})
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

  const setEmail = e => {
    setLoginBody({ ...loginBody, email: e.target.value })
  }
  const setPassword = e => {
    setLoginBody({ ...loginBody, password: e.target.value })
  }

  return (
    <div className="login-wrapper">
      <div className="login__header">Login</div>
      <div className="login__body">
        <form className="login-form">
          Your e-mail address:
          <input label="email" type="text" onChange={setEmail} />
          Your password:
          <input label="pw" type="password" onChange={setPassword} />
          <br />
          <PasswordChecker compare={loginBody.password}></PasswordChecker>
        </form>
        <button className="login__submit" onClick={() => login(loginBody)}>
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

  const setUser = e => {
    setRegisterBody({ ...registerBody, name: e.target.value })
  }
  const setEmail = e => {
    setRegisterBody({ ...registerBody, email: e.target.value })
  }
  const setPassword = e => {
    setRegisterBody({ ...registerBody, password: e.target.value })
  }

  return (
    <div className="register-wrapper">
      <div className="register__header">Register</div>
      <div className="register__body">
        <form className="register-form">
          Your username:
          <input label="username" type="text" onChange={setUser} />
          Your e-mail address:
          <input label="email" type="text" onChange={setEmail} />
          Your password:
          <input label="pw" type="password" onChange={setPassword} />
          Please check your password:
          <input label="pwcheck" type="password" onChange={setPassword} />
        </form>
        <button
          className="register__submit"
          onClick={() => register(registerBody)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const User = () => {
  return (
    <body>
      <h3 className="page-title">User Page</h3>
      <div className="user-container">
        <LoginForm />
        <div className="sep" />
        <RegisterForm />
      </div>
    </body>
  )
}

export default User
