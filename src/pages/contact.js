import React, { useState, useEffect } from "react"

import Layout from "src/components/Layout"
import Snackbar from "src/components/Snackbar"

import axios from "axios"

import "./styles/contact.css"

const Contact = () => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")
  const [apiStatus, setApiStatus] = useState("")
  const [sent, setSent] = useState(false)

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
      console.log(response.data, sent)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setApiStatus("Contact form submitted successfully!")
    } catch (err) {
      setSent(true)
      setTimeout(() => {
        setSent(false)
      }, 3000)
      setApiStatus(`An error has occurred.`)
    }
  }

  return (
    <Layout>
      <div className="contact-container light-bg border">
        <h2>Contact</h2>
        <p>
          Want to get in contact with me? Just fill the form below with any
          questions you have!
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
          <Snackbar
            open={sent}
            top={"0"}
            left={"50%"}
            transform={"translateX(-50%)"}
          >
            {apiStatus}
          </Snackbar>
        </form>
      </div>
    </Layout>
  )
}

export default Contact
