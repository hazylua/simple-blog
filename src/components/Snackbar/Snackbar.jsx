import React, { useEffect, useState } from "react"

import "./Snackbar.css"

const Snackbar = ({
  children,
  mount,
  setPending,
  displayTime,
  top,
  bottom,
  left,
  right,
  transform,
}) => {
  const [render, setRender] = useState(false)
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "all 2s ease",
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

  useEffect(() => {
    return () => {
      console.log("Clean up snackbar.")
    }
  }, [])

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
  )
}

export default Snackbar
