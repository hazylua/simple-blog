import React, { useEffect, useState, memo } from "react"
import PropTypes from "prop-types"

import "./Snackbar.css"

const Snackbar = React.memo(
  ({
    id,
    bottom,
    message,
    displayTime,
    clear,
    left,
    right,
    top,
    transform,
  }) => {
    const [notif, setNotif] = useState(null)
    // const [style, setStyle] = useState({
    //   opacity: 0,
    //   transition: "all 2s ease",
    // })
    useEffect(() => {
      // setTimeout(() => mountStyle(), 10)
      setNotif(
        setTimeout(() => {
          clear(id)
        }, displayTime + 500)
      )
      return () => {
        setNotif(clearTimeout(notif))
      }
    }, [])
    // const mountStyle = () => {
    //   setStyle({ ...style, transition: "all 1s ease", opacity: 1 })
    // }
    // const unMountStyle = () => {
    //   setStyle({ ...style, transition: "all 1s ease", opacity: 0 })
    // }
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
        {message}
      </div>
    )
  }
)

Snackbar.propTypes = {
  id: PropTypes.any.isRequired,
  bottom: PropTypes.string,
  children: PropTypes.any,
  displayTime: PropTypes.number.isRequired,
  left: PropTypes.string,
  right: PropTypes.string,
  top: PropTypes.string,
  transform: PropTypes.string,
}

export default Snackbar
