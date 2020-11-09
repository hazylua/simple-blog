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
    /* Store error later. */
  }
}

const LoginForm = () => {
  return (
    <div className="login-wrapper">
      <div className="login__header">Login</div>
      <div className="login__body">
        <form className="login-form">
          Your e-mail address:
          <input label="email" type="text" />
          Your password:
          <input label="pw" type="text" />
          Please check your password:
          <input label="pwcheck" type="text" />
          <br />
        </form>
        <button className="login__submit">Submit</button>
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
    console.log(registerBody.name)
  }

  const setEmail = e => {
    setRegisterBody({ ...registerBody, email: e.target.value })
    console.log(registerBody.email)
  }
  const setPassword = e => {
    setRegisterBody({ ...registerBody, password: e.target.value })
    console.log(registerBody.password)
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
          <input label="pw" type="text" onChange={setPassword} />
          Please check your password:
          <input label="pwcheck" type="text" onChange={setPassword} />
        </form>
      </div>
      <button
        className="register__submit"
        onClick={() => register(registerBody)}
      >
        Submit
      </button>
    </div>
  )
}

const User = () => {
  return (
    <body>
      <div className="user-container">
        <LoginForm />
        <div className="sep" />
        <RegisterForm />
      </div>
    </body>
  )
}

export default User
