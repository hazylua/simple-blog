import React, { useState, useEffect } from "react"
import Layout from "src/components/Layout"

import axios from "axios"

import "./styles/contact.css"

const Contact = () => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")
  const [apiStatus, setApiStatus] = useState("")

  const submitContact = async e => {
    e.preventDefault()
    const now = Date.now()
    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        subject: `Website Contact - ${name}`,
        mail: mail,
        date: now,
        message: message,
      })
      console.log(response.data)
      setApiStatus("Contact form submitted successfully!")
    } catch (err) {
      setApiStatus(`An error has occurred.`)
    }
  }

  return (
    <Layout>
      <div className="contact-container light-bg border">
        <h3>Contact</h3>
        <p>
          Want to get in contact with me? Fill the form below and I'll answer
          whatever you send me as soon as possible!
        </p>
        <form className="contact-form" onSubmit={submitContact}>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
          ></input>
          <input
            placeholder="Email"
            value={mail}
            onChange={e => setMail(e.target.value)}
          ></input>
          <textarea
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
          <button type="submit" value="Submit">
            Send!
          </button>
          {apiStatus}
        </form>
      </div>
    </Layout>
  )
}

export default Contact
