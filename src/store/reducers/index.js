import { combineReducers } from "redux"

import snackbars from "./snackbars"
import UserSession from "./user-auth"

const rootReducer = combineReducers({
  snackbars: snackbars,
  UserSession: UserSession,
})

export default rootReducer
