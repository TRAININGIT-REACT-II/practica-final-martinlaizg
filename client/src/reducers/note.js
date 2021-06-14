import actionTypes from "../actions/types"


const initialState = {
	list: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_NOTES:
			return {
				list: action.notelist
			}
		case actionTypes.ADD_NOTE:
			return {
				list: [
					...state.list,
					{
						title: action.note.title,
						content: action.note.content,
						author: action.note.author
					}
				]
			}
		case actionTypes.COMPLETE_NOTE:
			return {
				list: [
					...state.list.slice(0, action.index),
					{
						...state.list[action.index],
						completed: true
					},
					...state.list.slice(action.index + 1),
				]
			}
		case actionTypes.REMOVE_NOTE:
			if (!index) {
				return initialState
			}
			return {
				list: [
					...state.list.slice(0, action.index),
					...state.list.slice(action.index + 1),
				]
			}
		default:
			return state
	}
}

export default reducer