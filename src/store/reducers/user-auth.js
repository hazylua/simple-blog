import { AUTH_SESSION, LEAVE_SESSION } from "../constants"

const defaultState = { user: null, auth: false, token: null }

const UserSession = (state = defaultState, action) => {
  const { payload, type } = action
  switch (type) {
    case AUTH_SESSION:
      console.log(state)
      return { user: payload.user, auth: true, token: payload.token }
    case LEAVE_SESSION:
      return { auth: false, token: null, user: null }
    default:
      return state
  }
}

export default UserSession
