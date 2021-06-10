import { createStore, combineReducers, applyMiddleware } from "redux"

import note from "./reducers/note"
import user from "./reducers/user"
import login from "./middleware/login"


export default createStore(
	combineReducers({ note, user }),
	applyMiddleware(login))

