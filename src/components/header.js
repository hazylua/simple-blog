import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { AiOutlineSearch, AiOutlineBars } from "react-icons/ai"

import "./styles/header.css"

const Header = ({ siteTitle }) => (
  <header className="header-container">
    <h1 style={{ marginBottom: "5px" }}>
      <Link to="/" className="header-title">
        {siteTitle}
      </Link>
    </h1>
    <div className="header-search-wrapper">
      <input className="header-search-input" />
      <div id="header-search-icon">
        <AiOutlineSearch
          style={{
            display: "block",
            margin: "auto",
          }}
          size={30}
        />
      </div>
      <div id="header-mobile-nav">
        <AiOutlineBars
          style={{
            display: "block",
            margin: "auto",
          }}
          color={"white"}
          size={30}
        />
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
