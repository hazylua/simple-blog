import React, { useState } from "react"

import Layout from "src/components/Layout"
import Snackbar from "src/components/Snackbar"

import axios from "axios"

import "./styles/contact.css"

const SubmitNotification = ({ children }) => {
  return (
    <Snackbar
      top={"0"}
      left={"50%"}
      transform={"translateX(-50%)"}
      open={false}
    >
      {children}
    </Snackbar>
  )
}

const ContactForm = () => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")

  const submitContact = async e => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        subject: `Website Contact - ${name}`,
        mail: mail,
        date: new Date.now(),
        message: message,
      })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
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

      <SubmitNotification>cool</SubmitNotification>
    </form>
  )
}

const Contact = () => {
  return (
    <Layout>
      <div className="contact-container light-bg border">
        <h2>Contact</h2>
        <p>
          Want to get in contact with me? Just fill the form below with any
          questions you have!
        </p>
        <ContactForm />
      </div>
    </Layout>
  )
}

export default Contact
