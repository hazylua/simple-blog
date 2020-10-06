import React from "react"
import { AiFillGithub } from "react-icons/ai"

const Links = props => {
  return (
    <div>
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
        background: "rebeccapurple",
        borderTop: "3px solid rgb(51, 19, 82)",
        color: "rgb(245, 245, 245)",
        marginTop: "1.45rem",
        padding: "1.45rem 2rem",
      }}
    >
      {siteTitle}
      <Links repo={siteRepo} />
      <Copyright />
    </div>
  )
}

export default Footer
