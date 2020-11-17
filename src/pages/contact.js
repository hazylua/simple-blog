import React, { useState } from "react"
import Layout from "src/components/Layout"

import axios from "axios"

import "./styles/contact.css"

const sendInfo = (mail, name, message) => {
  try {
    const response = axios.post("https://localhost:5000/api/contact", {
      mail: mail,
      subject: `Website Contact - ${name}`,
      message: message,
    })
    alert(response.success)
  } catch (err) {
    alert(err)
  }
}

const Contact = () => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")

  return (
    <Layout>
      <div className="contact-container">
        <h3>Contact</h3>
        <p>
          Want to get in contact with me? Fill the form below and I'll answer
          whatever you send me as soon as possible!
        </p>

        <form
          className="contact-form"
          method="post"
          action={() => sendInfo(mail, name, message)}
        >
          <input
            placeholder="Your name"
            onChange={e => setName(e.target.value)}
          ></input>
          <input
            placeholder="Email"
            onChange={e => setMail(e.target.value)}
          ></input>
          <textarea
            placeholder="Message"
            onChange={e => setMessage(e.target.value)}
          ></textarea>
          <button>Send!</button>
        </form>
      </div>
    </Layout>
  )
}

export default Contact
