import React, { useEffect, useState } from "react"

import "./Snackbar.css"

const Snackbar = ({ children, top, bottom, left, right, open, transform }) => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    console.log(open)
    if (open === true) {
      setRender(true)
      setTimeout(() => {
        setRender(false)
      }, 5000)
    } else {
      setRender(false)
    }
  }, [open])

  return (
    <React.Fragment>
      {render ? (
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
          {children}
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default Snackbar
