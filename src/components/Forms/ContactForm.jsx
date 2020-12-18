import React, { useState } from "react"

import { contactSubmit } from "src/services/contact"

import { notify } from "src/services/snackbar-notify"

import "./ContactForm.css"

const ContactForm = ({ actions }) => {
  const [contactBody, setContactBody] = useState({
    subject: "",
    email: "",
    body: "",
  })

  const handleContactSubmit = async body => {
    // Get date of when submit action happened.
    const date = new Date()
    try {
      const response = await contactSubmit({ ...body, date: date })
      notify(`Contact message sent.`, actions, "middle", 2000)
    } catch (err) {
      if (err.response) notify(`${err.response.data}`, actions, "middle", 2000)
    }
  }

  return (
    <>
      <form className="contact-form" onSubmit={handleContactSubmit}>
        <input
          placeholder="The subject."
          type="text"
          onChange={e =>
            setContactBody({ ...contactBody, subject: e.target.value })
          }
        ></input>
        <input
          placeholder="Contact e-mail."
          type="text"
          onChange={e =>
            setContactBody({ ...contactBody, email: e.target.value })
          }
        ></input>
        <textarea
          placeholder="Your message."
          type="text"
          onChange={e =>
            setContactBody({ ...contactBody, body: e.target.value })
          }
        ></textarea>
      </form>
      <button
        className="contact-submit"
        onClick={() => handleContactSubmit(contactBody)}
      >
        Send!
      </button>
    </>
  )
}

export default ContactForm
