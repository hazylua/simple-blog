import { ADD_SNACKBAR, REMOVE_SNACKBAR } from "../constants"

const defaultState = []

const snackbars = (state = defaultState, action) => {
  const { payload, type } = action
  switch (type) {
    case ADD_SNACKBAR:
      return [payload, ...state]
    case REMOVE_SNACKBAR:
      return state.filter(snackbar => snackbar.id !== payload)
    default:
      return state
  }
}

export default snackbars
