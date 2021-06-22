export const getNotes = (state) => state.note.list;

export const getNote = (state, id) => {
	let notes = state.note.list?.filter((n) => n.id === id)
	if (!notes || notes.length == 0) return null
	return notes[0]
}