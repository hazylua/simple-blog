import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import { AiOutlineSearch, AiOutlineBars } from "react-icons/ai"

import "./Header.css"

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

const SearchBar = ({
  displayMenu,
  setDisplayMenu,
  handleChange,
  handleEnterDown,
}) => {
  const [isFocused, setFocus] = useState(false)

  return (
    <div
      className="header-search-wrapper"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={
        isFocused
          ? {
              outline: "none",
              borderColor: "blue",
              boxShadow: "0 0 10px #9ecaed",
            }
          : { border: "2px solid #dadada", borderRadius: "3px" }
      }
    >
      <input
        className="header-search-input"
        onChange={handleChange}
        onKeyDown={handleEnterDown}
      />
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
  )
}

const Header = ({ siteTitle }) => {
  const [displayMenu, setDisplayMenu] = useState(false)
  const [query, setQuery] = useState("")

  const handleEnterDown = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      navigate("/search", { state: { query } })
    }
  }

  const handleChange = event => {
    setQuery(event.target.value)
  }

  return (
    <>
      <header className="header-container">
        <h1 style={{ marginBottom: "5px" }}>
          <Link to="/" className="header-title">
            {siteTitle}
          </Link>
        </h1>
        <SearchBar
          handleChange={handleChange}
          displayMenu={displayMenu}
          setDisplayMenu={setDisplayMenu}
          handleEnterDown={handleEnterDown}
        />
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
