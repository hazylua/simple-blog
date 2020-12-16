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

export const authSession = (user, email, admin, date_expire) => {
  return {
    payload: {
      user: user,
      email: email,
      admin: admin,
      auth: true,
      date_expire: date_expire,
    },
    type: AUTH_SESSION,
  }
}

export const leaveSession = () => {
  return {
    payload: null,
    type: LEAVE_SESSION,
  }
}
