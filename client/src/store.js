import { createStore, combineReducers, applyMiddleware } from "redux"

import note from "./reducers/note"
import user from "./reducers/user"
import saveLogin from "./middleware/saveLogin"


export default createStore(
	combineReducers({ note, user }),
	applyMiddleware(saveLogin))

