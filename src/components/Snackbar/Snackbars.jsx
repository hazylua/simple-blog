import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Snackbar from "./Snackbar"
import { removeSnackbar } from "src/store/actions"

const Snackbars = ({ actions, snackbars }) => {
  const { removeSnackbar } = actions
  return (
    <>
      {snackbars.map(snackbar => {
        const { id } = snackbar
        console.log("dsadsa")
        return (
          <Snackbar
            {...snackbar}
            key={id}
            onDismissClick={() => removeSnackbar(id)}
          />
        )
      })}
    </>
  )
}

Snackbars.propTypes = {
  actions: PropTypes.shape({
    removeSnackbar: PropTypes.func.isRequired,
  }).isRequired,
  snackbars: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.any,
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeSnackbar }, dispatch),
})

const mapStateToProps = state => ({
  snackbars: state.snackbars,
})

export default connect(mapStateToProps, mapDispatchToProps)(Snackbars)
