import actionTypes from '../actions/types'


const login = (store) => (next) => (action) => {
	const result = next(action)
	// Solo controlamos la obtención del usuario logeado
	if (action.type === actionTypes.REMOVE_USER) {
		localStorage.removeItem("USER_LOGGED")
	} else if (action.type === actionTypes.SET_USER) {
		localStorage.setItem("USER_LOGGED", JSON.stringify(store.getState().user))
	}
	return result
}

export default login