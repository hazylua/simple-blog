import { createStore as reduxCreateStore } from "redux"

import rootReducer from "./reducers"

// const initialState = {
//     snackbars: [],
//     UserSession: {
//         user: null,
//         email: null,
//         admin: false,
//         auth: null,
//         date_expire: null,
//       }
// }

const createStore = () => reduxCreateStore(rootReducer)
export default createStore
