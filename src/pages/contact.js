import React, { useState } from "react"
import PropTypes from "prop-types"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Layout from "src/components/Layout"

import { addSnackbar } from "src/store/actions"

import axios from "axios"

import "./styles/contact.css"

const notify = (status, actions) => {
  const { addSnackbar } = actions
  const options = {
    message: status,
    style: "middle",
    displayTime: 2000,
  }
  addSnackbar(options)
}

const MessageFailed = () => {
  return <p>Contact form submit failed.</p>
}

const MessageSuccess = () => {
  return <p>Form submitted successfully.</p>
}

const ContactForm = ({ actions }) => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [date, setDate] = useState(new Date())
  const [message, setMessage] = useState("")

  const submitContact = async e => {
    e.preventDefault()
    // Get date of submit action.
    setDate(new Date())
    try {
      await axios.post("http://localhost:5000/api/contact", {
        subject: `Website Contact - ${name}`,
        mail: mail,
        date: date,
        message: message,
      })
      const status = <MessageSuccess />
      notify(status, actions)
    } catch (err) {
      const status = <MessageFailed />
      notify(status, actions)
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
    </form>
  )
}

const Contact = ({ actions }) => {
  return (
    <Layout>
      <div className="contact-container light-bg border">
        <h2>Contact</h2>
        <p>
          Want to get in contact with me? Just fill the form below with any
          questions you have!
        </p>
        <ContactForm actions={actions} />
      </div>
    </Layout>
  )
}

Contact.propTypes = {
  actions: PropTypes.shape({
    addSnackbar: PropTypes.func.isRequired,
  }).isRequired,
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addSnackbar }, dispatch),
})

export default connect(null, mapDispatchToProps)(Contact)
