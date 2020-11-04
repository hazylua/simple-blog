import React from "react"
import { AiFillGithub } from "react-icons/ai"

import "./Footer.css"

const GitLink = ({ url }) => {
  return (
    <div className="footer-link-wrapper">
      <a href={url}>
        <AiFillGithub className="footer-link__icon" />
      </a>
      Github
    </div>
  )
}

const Copyright = () => {
  return (
    <div>
      <span className="footer-copyright__symbol">©</span> 2020 - Copyright
      Placeholder
    </div>
  )
}

const Footer = ({ siteTitle, siteRepo }) => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        {siteTitle}
        <GitLink url={siteRepo} />
        <Copyright />
      </div>
    </div>
  )
}

export default Footer
