import React from "react"
import { AiOutlineSearch } from "react-icons/ai"

import "./SearchBar.css"

const SearchIcon = ({ size }) => {
  return <AiOutlineSearch className="search__icon" size={size} />
}

const SearchInput = ({ handleChange, handleEnterDown }) => {
  return (
    <input
      onKeyDown={handleEnterDown}
      onChange={handleChange}
      className="search__input"
    />
  )
}

const SearchBar = ({ size, handleChange, handleEnterDown }) => {
  return (
    <div className="search__wrapper">
      <SearchIcon size={size} />
      <SearchInput
        handleChange={handleChange}
        handleEnterDown={handleEnterDown}
      />
    </div>
  )
}

export default SearchBar
