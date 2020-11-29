import React, { useState } from "react"

import axios from "axios"

import Navbar from "src/components/Navbar"
import Footer from "src/components/Footer"
import Snackbar from "src/components/Snackbar"

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
  console.log(token, document.cookie)
}

const LoginForm = ({ setNotification }) => {
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
      setNotification({
        render: true,
        message: "Logged in succesfully.",
      })
    } catch (err) {
      console.log(err.response)
      if (err.response.data.message) {
        setNotification({
          render: true,
          message: `${err.response.data.message}`,
        })
      } else if (err.response.data)
        setNotification({
          render: true,
          message: `${err.response.data}`,
        })
      else
        setNotification({
          render: true,
          message: `An error has occurred.`,
        })
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

const RegisterForm = ({ setNotification }) => {
  const [registerBody, setRegisterBody] = useState({
    name: "",
    email: "",
    password: "",
  })

  const registerUser = async credentials => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user`,
        credentials
      )
      setNotification({ render: true, message: "Registered." })
    } catch (err) {
      if (err.response.data.message)
        setNotification({
          render: true,
          message: `${err.response.data.message}`,
        })
      else setNotification({ render: true, message: "An error has occurred." })
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

const User = () => {
  const [notification, setNotification] = useState({
    render: false,
    message: "",
  })

  const showNotification = value => {
    setNotification({ ...notification, render: value })
  }
  return (
    <>
      <Navbar />
      <div className="auth-container light-bg border box-shadow">
        <h2>User Page</h2>
        <div className="user-container">
          <LoginForm
            setNotification={setNotification}
            showNotification={showNotification}
          />
          <div className="sep" />
          <RegisterForm
            setNotification={setNotification}
            showNotification={showNotification}
          />
          {notification.render ? (
            <Snackbar
              top={"10px"}
              left={"50%"}
              transform={"translateX(-50%)"}
              displayTime={3000}
              mount={notification.render}
              setRender={showNotification}
            >
              {notification.message}
            </Snackbar>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default User
