import React from "react"
import Layout from "../components/layout"

const inputStyle = {
  width: "25%",
  padding: "10px 15px",
  marginBottom: "1rem",
  borderRadius: "10px",
  border: "1px solid silver",
}

const messageBox = {
  width: "50%",
  height: "150px",
  padding: "10px 15px",
  marginBottom: "1.45rem",
  borderRadius: "10px",
  border: "1px solid silver",
}

const Contact = () => {
  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: "1000px", margin: "auto", marginTop: "1.45rem" }}
      >
        <h3>Contact</h3>
        <p>
          Want to get in contact with me? Fill the form below and I'll answer
          whatever you send me as soon as possible!
        </p>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Segoe UI",
          }}
        >
          <input style={inputStyle} placeholder="Name"></input>
          <input style={inputStyle} placeholder="Email"></input>
          <textarea style={messageBox} placeholder="Message"></textarea>
          <button
            type="submit"
            style={{
              padding: "10px",
              width: "10%",
              borderRadius: "10px",
              border: "1px solid silver",
              fontFamily: "Segoe UI",
            }}
          >
            Send!
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Contact
