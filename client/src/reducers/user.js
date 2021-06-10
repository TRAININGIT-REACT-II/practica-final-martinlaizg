import actionTypes from "../actions/types"


const initialState = {
	username: "",
	id: "",
	token: "",
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.SET_USER:
			return {
				username: action.user.username,
				id: action.user.id,
				token: action.user.token,
			}
		case actionTypes.REMOVE_USER:
			return initialState
		default:
		return state
	}
}

export default reducer