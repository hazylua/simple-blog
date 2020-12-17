import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import "./Snackbar.css"
import * as SnackbarStyles from "./styles"

const chooseStyle = style => {
  if (typeof style === "object" && style !== null) {
    return style
  } else if (typeof style === "string" && style !== null) {
    const choice = SnackbarStyles[`${style}`]
    if (choice) return choice
  }
  return {}
}

const Snackbar = React.memo(({ id, style, message, displayTime, clear }) => {
  const [notif, setNotif] = useState(null)
  const [mount, setMount] = useState({
    opacity: 0,
    transition: "all 2s ease",
  })

  useEffect(() => {
    setTimeout(() => mountStyle(), 10)
    setNotif(
      setTimeout(() => {
        clear(id)
      }, displayTime + 1000)
    )
    setTimeout(() => unMountStyle(), displayTime)
    return () => {
      setNotif(clearTimeout(notif))
    }
  }, [])

  const mountStyle = () => {
    setMount({ ...mount, transition: "all 1s ease", opacity: 1 })
  }

  const unMountStyle = () => {
    setMount({ ...mount, transition: "all 1s ease", opacity: 0 })
  }

  return (
    <div className="snackbar" style={{ ...chooseStyle(style), ...mount }}>
      {message}
    </div>
  )
})

Snackbar.propTypes = {
  id: PropTypes.any.isRequired,
  style: PropTypes.any,
  mount: PropTypes.object,
  children: PropTypes.any,
  displayTime: PropTypes.number.isRequired,
}

export default Snackbar
