import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import { AiOutlineSearch, AiOutlineBars } from "react-icons/ai"

import "./styles/header.css"

const NavbarMenu = props => {
  return (
    <nav
      className="mobnavbar-container"
      style={{
        position: "absolute",
        top: "88px",
        transform: "translateX(-90%)",
      }}
    >
      <Link className="mobnavbar-link" to="/">
        Home
      </Link>

      <Link className="mobnavbar-link" to="/blog">
        Blog
      </Link>

      <Link
        className="mobnavbar-link"
        activeClassName="active-link"
        to="/merch"
      >
        Merch
      </Link>

      <Link className="mobnavbar-link" to="/about">
        About
      </Link>

      <Link className="mobnavbar-link" to="/contact">
        Contact
      </Link>
    </nav>
  )
}

const MobNavToggle = props => {
  const [display, setDisplay] = useState(false)
  return (
    <>
      <div id="header-mobile-nav">
        <AiOutlineBars
          style={{
            display: "block",
            margin: "auto",
          }}
          color={"white"}
          size={30}
          onClick={() => setDisplay(!display)}
        />
      </div>
      {display && props.children}
    </>
  )
}

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
      <MobNavToggle>
        <NavbarMenu />
      </MobNavToggle>
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
