import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { addSnackbar } from "src/store/actions"

import Layout from "src/components/Layout"
import { ContactForm } from "src/components/Forms"

import "./styles/contact.css"

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
