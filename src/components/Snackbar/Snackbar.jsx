import React, { useEffect, useState, memo } from "react"
import PropTypes from "prop-types"

import "./Snackbar.css"

const Snackbar = ({
  id,
  bottom,
  message,
  displayTime,
  remove,
  left,
  right,
  top,
  transform,
}) => {
  const timeout = setTimeout(() => {
    remove(id)
  }, displayTime)
  // const [style, setStyle] = useState({
  //   opacity: 1,
  //   transition: "all 2s ease",
  // })

  // const mountStyle = () => {
  //   setStyle({ ...style, transition: "all 1s ease", opacity: 1 })
  // }
  // const unMountStyle = () => {
  //   setStyle({ ...style, transition: "all 1s ease", opacity: 0 })
  // }
  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [id])

  return (
    <div
      className="snackbar"
      style={{
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        transform: transform,
      }}
    >
      {message}
    </div>
  )
}

Snackbar.propTypes = {
  id: PropTypes.any.isRequired,
  bottom: PropTypes.string,
  children: PropTypes.any,
  displayTime: PropTypes.number.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  left: PropTypes.string,
  right: PropTypes.string,
  top: PropTypes.string,
  transform: PropTypes.string,
}

export default memo(Snackbar)
