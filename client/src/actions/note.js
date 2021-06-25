import actionTypes from "./types"

export const setNotes = (notelist) => {
	return {
		type: actionTypes.SET_NOTES,
		notelist
	}
}
export const addNote = (note) => {
	return {
		type: actionTypes.ADD_NOTE,
		note
	}
}
export const completeNote = (index) => {
	return {
		type: actionTypes.COMPLETE_NOTE,
		index
	}
}
export const removeNote = (id) => {
	return {
		type: actionTypes.REMOVE_NOTE,
		id
	}
}

export const removeNotes = () => {
	return {
		type: actionTypes.REMOVE_NOTE
	}
}

export const replaceNote = (note) => {
	return {
		type: actionTypes.REPLACE_NOTE,
		note
	}
}