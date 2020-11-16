import React from "react"
import { AiOutlineSearch } from "react-icons/ai"

import "./SearchBar.css"

const SearchIcon = () => {
  return <AiOutlineSearch className="search__icon" size={20} />
}

const SearchInput = () => {
  return <input className="search__input" />
}

const SearchBar = () => {
  return (
    <div className="search__wrapper">
      <SearchIcon />
      <SearchInput />
    </div>
  )
}

export default SearchBar
