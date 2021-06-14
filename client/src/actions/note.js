import actionTypes from "./types"

export const setNotes = (notelist) => {
	return {
		type: actionTypes.SET_NOTES,
		notelist
	}
}
export const addNote = (title, content, author) => {
	return {
		type: actionTypes.ADD_NOTE,
		note: {
			title, content, author
		}
	}
}
export const completeNote = (index) => {
	return {
		type: actionTypes.COMPLETE_NOTE,
		index
	}
}
export const removeNote = (index) => {
	return {
		type: actionTypes.REMOVE_NOTE,
		index
	}
}

export const removeNotes = () => {
	return {
		type: actionTypes.REMOVE_NOTE
	}
}