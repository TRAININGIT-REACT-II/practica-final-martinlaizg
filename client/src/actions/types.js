

const actions = [
	"GET_USER",
	"SET_USER",
	"REMOVE_USER",

	"SET_NOTES",
	"ADD_NOTE",
	"COMPLETE_NOTE",
	"REMOVE_NOTE",
]

const actionTypes = {}

actions.forEach((a) => {
	actionTypes[a] = a
})

export default actionTypes