import React from "react"
import { AiFillGithub } from "react-icons/ai"

const Links = props => {
  return (
    <div style={{ margin: "0.75rem 0" }}>
      <a
        style={{ textDecoration: "none", color: "rgb(245, 245, 245)" }}
        href={props.repo}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AiFillGithub
            style={{ display: "block", margin: "auto 0.25rem auto 0" }}
          />{" "}
          Github
        </div>
      </a>
    </div>
  )
}

const Copyright = () => {
  return <div>© 2020 - Copyright Placeholder</div>
}

const Footer = ({ siteTitle, siteRepo }) => {
  return (
    <div
      style={{
        background: "#562996",
        borderTop: "3px solid rgb(51, 19, 82)",
        color: "rgb(245, 245, 245)",
        marginTop: "1.45rem",
        padding: "1.45rem 2rem",
      }}
    >
      <div style={{ margin: "auto", maxWidth: "80%" }}>
        {siteTitle}
        <Links repo={siteRepo} />
        <Copyright />
      </div>
    </div>
  )
}

export default Footer
