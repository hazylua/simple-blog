import React from "react"

// Not needed. (?)
// import "../../components/Layout/Layout.css"
import "./User.css"

const login = ({ credentials }) => {
  alert(credentials)
}

const LoginForm = () => {
  return (
    <div className="login-wrapper">
      <div className="login__header">Login</div>
      <div className="login__body">
        <form className="login-form">
          Your username:
          <input label="username" type="text" />
          Your e-mail address:
          <input label="email" type="text" />
          Your password:
          <input label="pw" type="text" />
          Please check your password:
          <input label="pwcheck" type="text" />
          <br />
          <button className="login__submit" onClick={() => login(123)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

const RegisterForm = () => {
  return (
    <div className="register-wrapper">
      <div className="register__header">Login</div>
      <div className="register__body">
        <form className="register-form">
          Your e-mail address:
          <input label="email" type="text" />
          Your password:
          <input label="pw" type="text" />
          Please check your password:
          <input label="pwcheck" type="text" />
          <button className="register__submit" onClick={() => login(123)}>
            Submit
          </button>
        </form>
      </div>
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
