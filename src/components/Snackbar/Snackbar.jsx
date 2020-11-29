import React, { useEffect, useState } from "react"

import "./Snackbar.css"

const Snackbar = ({
  children,
  render,
  setRender,
  displayTime,
  top,
  bottom,
  left,
  right,
  transform,
}) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "all 2s ease",
  })

  useEffect(() => {
    if (render) {
      setTimeout(() => mountStyle(), 10)
      setTimeout(() => unMountStyle(), displayTime + 10)
      setTimeout(() => setRender(false), 10)
    }
  }, [render])

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

export default Snackbar
