import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { AiOutlineSearch } from "react-icons/ai"

import "./styles/header.css"

const Header = ({ siteTitle }) => (
  <header className="header-container">
    <h1 style={{ marginBottom: "5px" }}>
      <Link to="/" className="header-title">
        {siteTitle}
      </Link>
    </h1>
    <div className="header-search-wrapper">
      <input placeholder="Search..." className="header-search-input" />
      <h3 className="header-search-icon">
        <AiOutlineSearch />
      </h3>
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
