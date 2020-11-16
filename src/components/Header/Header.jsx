import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./Header.css"

const Header = ({ siteTitle }) => {
  return (
    <header className="header-container">
      <h1 style={{ marginBottom: "5px" }}>
        <Link to="/" className="header-title">
          {siteTitle}
        </Link>
      </h1>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
