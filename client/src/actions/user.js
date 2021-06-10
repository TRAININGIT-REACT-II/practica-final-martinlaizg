import actionTypes from "./types";


export const setUser = (id, username, token) => {
	return {
		type: actionTypes.SET_USER,
		user: {
			id, username, token
		}
	}
}

export const removeUser = () => ({
	type: actionTypes.REMOVE_USER
})