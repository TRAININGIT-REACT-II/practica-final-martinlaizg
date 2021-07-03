// Selector para el usuario logeado
export const getUser = (state) => {
	var user = state.user
	// Si el usuario no tiene token vamos a buscarlo al localstorage
	if (!state.user.token) {
		const storedUser = JSON.parse(localStorage.getItem("USER_LOGGED"))
		// Si hay un usuario en el localstorage y tiene token lo devolvemos
		if (storedUser && storedUser.token) {
			return storedUser
		}
	}
	return user
};

export const getToken = (state) => {
	return getUser(state)?.token
}