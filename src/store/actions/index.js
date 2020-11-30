import createSnackbar from "../factories/createSnackbar"
import { ADD_SNACKBAR, REMOVE_SNACKBAR } from "../constants"

export const addSnackbar = (options = {}) => {
  return {
    payload: createSnackbar(options),
    type: ADD_SNACKBAR,
  }
}

export const removeSnackbar = id => {
  return {
    payload: id,
    type: REMOVE_SNACKBAR,
  }
}
