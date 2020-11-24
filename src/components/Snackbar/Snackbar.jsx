import React, { useEffect, useState } from "react"

import "./Snackbar.css"

const Snackbar = ({ children, mount, setPending, displayTime }) => {
  const [render, setRender] = useState(false)
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "all 2s ease",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "5px",
  })

  useEffect(() => {
    // After setPending, display fade out animation and unmount the component.
    if (!mount) {
      setTimeout(() => unMountStyle(), 10)
      setTimeout(() => setRender(false), 1000)
      return
    }
    if (mount) {
      // Set the snackbar to render.
      setRender(true)
    } else if (!mount) {
    }
    if (render) {
      // Once rendered, change styles.
      setTimeout(() => mountStyle(), 10)
      // After an amount of time set by displayTime has passed, set it to tell page that notification has been displayed.
      setTimeout(() => setPending(), displayTime)
    }
  }, [mount, render])

  const mountStyle = () => {
    setStyle({ ...style, transition: "all 1s ease", opacity: 1 })
  }
  const unMountStyle = () => {
    setStyle({ ...style, transition: "all 1s ease", opacity: 0 })
  }

  return (
    render && (
      <div
        className="snackbar"
        // style={{
        //   top: top,
        //   bottom: bottom,
        //   left: left,
        //   right: right,
        //   transform: transform,
        // }}
        style={style}
      >
        {children}
      </div>
    )
  )
}

export default Snackbar
