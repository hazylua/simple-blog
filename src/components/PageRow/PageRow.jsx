import React from "react"

import "./PageRow.css"

const PageSelect = ({ pageValue, setPage }) => {
  return (
    <button className="page-select" onClick={() => setPage(pageValue)}>
      {pageValue}
    </button>
  )
}

const PageRow = ({ maxResultsPerPage, itemsNum, setPage }) => {
  var buttons = []
  for (var i = 1; i <= Math.ceil(itemsNum / maxResultsPerPage); i++) {
    buttons.push(<PageSelect key={i} pageValue={i} setPage={setPage} />)
  }
  return (
    <div>
      {buttons.length > 1
        ? buttons.map(button => {
            return button
          })
        : null}
    </div>
  )
}

export default PageRow
