import React, { useEffect, useState, memo } from "react"
import PropTypes from "prop-types"

import "./Snackbar.css"

const Snackbar = ({
  bottom,
  children,
  displayTime,
  left,
  right,
  top,
  transform,
}) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "all 2s ease",
  })

  const mountStyle = () => {
    setStyle({ ...style, transition: "all 1s ease", opacity: 1 })
  }
  const unMountStyle = () => {
    setStyle({ ...style, transition: "all 1s ease", opacity: 0 })
  }

  return (
    <div
      className="snackbar"
      style={{
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        transform: transform,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

Snackbar.propTypes = {
  bottom: PropTypes.string,
  children: PropTypes.node.isRequired,
  displayTime: PropTypes.number.isRequired,
  left: PropTypes.string,
  right: PropTypes.string,
  top: PropTypes.string,
  transform: PropTypes.string,
}

export default memo(Snackbar)
