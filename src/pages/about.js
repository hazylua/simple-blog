import React from "react"
import Layout from "src/components/Layout"

import "./styles/about.css"

const About = () => {
  return (
    <Layout>
      <div className="about-container light-bg border">
        <h3>About</h3>
        <p>An about page where you can talk about yourself.</p>
      </div>
    </Layout>
  )
}

export default About
