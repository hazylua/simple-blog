import React from "react"
import { AiOutlineSearch } from "react-icons/ai"

import "./SearchBar.css"

const SearchIcon = ({ size }) => {
  return <AiOutlineSearch className="search__icon" size={size} />
}

const SearchInput = () => {
  return <input className="search__input" />
}

const SearchBar = ({ size }) => {
  return (
    <div className="search__wrapper">
      <SearchIcon size={size} />
      <SearchInput />
    </div>
  )
}

export default SearchBar
