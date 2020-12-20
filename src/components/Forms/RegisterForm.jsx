import React, { useState } from "react"

import { userRegister } from "src/services/user-auth"

import { notify } from "src/services/snackbar-notify"

import "./RegisterForm.css"

const RegisterForm = ({ actions }) => {
  const [registerBody, setRegisterBody] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleRegister = async credentials => {
    try {
      const response = await userRegister(credentials)
      if (response)
        notify(
          "Registration complete. You may now login.",
          actions,
          "middle",
          2000
        )
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions, "middle", 2000)
      else
        notify(
          "No response from the server. Try again later.",
          actions,
          "middle",
          2000
        )
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register__header">Register</div>
      <div className="register__body">
        <form className="register-form">
          Your username:
          <input
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
          onClick={() => handleRegister(registerBody)}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default RegisterForm
