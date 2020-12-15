import React, { useState } from "react"

import { userRegister } from "src/services/user-auth"

import "./RegisterForm.css"

const notify = (status, actions) => {
  const { addSnackbar } = actions
  const options = {
    message: status,
    style: "middle",
    displayTime: 2000,
  }
  addSnackbar(options)
}

const RegisterForm = ({ actions }) => {
  const [registerBody, setRegisterBody] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleRegister = async credentials => {
    try {
      const response = await userRegister(credentials)
      notify("Registration complete. You may now login.", actions)
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions)
      else console.log(err)
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
