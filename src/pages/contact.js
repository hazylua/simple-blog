import React, { useState } from "react"

import Layout from "src/components/Layout"
import Snackbar from "src/components/Snackbar"

import axios from "axios"

import "./styles/contact.css"

const ContactForm = () => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [date, setDate] = useState(new Date())
  const [message, setMessage] = useState("")
  const [notification, setNotification] = useState({
    pending: false,
    message: "",
  })

  const setPending = () => {
    setNotification({ ...notification, pending: false })
  }

  const submitContact = async e => {
    e.preventDefault()
    // Get date of submit action.
    setDate(new Date())
    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        subject: `Website Contact - ${name}`,
        mail: mail,
        date: date,
        message: message,
      })
      setNotification({
        pending: true,
        message: `Submitted.\n${response.data.date}\n${response.data._id}`,
      })
    } catch (err) {
      console.log(notification)
      setNotification({
        pending: true,
        message: `${err.response.data.message}`,
      })
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
      <Snackbar
        mount={notification.pending}
        setPending={setPending}
        displayTime={3000}
      >
        {notification.message}
      </Snackbar>
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
