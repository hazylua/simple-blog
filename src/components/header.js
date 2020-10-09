import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import { AiOutlineSearch, AiOutlineBars } from "react-icons/ai"

import "./styles/header.css"

const NavbarMenu = props => {
  return (
    <>
      {props.display && (
        <nav className="mobnavbar-container">
          <Link className="mobnavbar-link" to="/">
            Home
          </Link>

          <Link className="mobnavbar-link" to="/blog">
            Blog
          </Link>

          {/* <Link className="mobnavbar-link" to="/merch">
            Merch
          </Link> */}

          <Link className="mobnavbar-link" to="/about">
            About
          </Link>

          <Link className="mobnavbar-link" to="/contact">
            Contact
          </Link>
        </nav>
      )}
    </>
  )
}

const MobNavToggle = () => {
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
        />
      </div>
    </>
  )
}

const Header = ({ siteTitle }) => {
  const [displayMenu, setDisplayMenu] = useState(false)
  return (
    <>
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
          <div onClick={() => setDisplayMenu(!displayMenu)}>
            <MobNavToggle />
          </div>
        </div>
      </header>
      <NavbarMenu display={displayMenu} />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
