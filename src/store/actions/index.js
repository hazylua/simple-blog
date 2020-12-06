import createSnackbar from "../factories/createSnackbar"
import {
  ADD_SNACKBAR,
  REMOVE_SNACKBAR,
  AUTH_SESSION,
  LEAVE_SESSION,
} from "../constants"

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

export const authSession = (token, user) => {
  return {
    payload: { user: user, auth: true, token: token },
    type: AUTH_SESSION,
  }
}

export const leaveSession = user => {
  return {
    payload: user,
    type: LEAVE_SESSION,
  }
}
