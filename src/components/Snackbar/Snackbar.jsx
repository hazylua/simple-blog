import { transform } from "lodash"
import React from "react"

import "./Snackbar.css"

const Snackbar = ({ children, top, bottom, left, right, open, transform }) => {
  return (
    <React.Fragment>
      {open ? (
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
