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
					action.note
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
			return {
				list: [
					...state.list.filter((n) => n.id !== action.id)
				]
			}
		case actionTypes.REPLACE_NOTE:
			return {
				list: [
					...state.list.map((n)=>{
						var newNote = n
						if(n.id === action.note.id){
							newNote = action.note
						}
						return newNote
					})
				]
			}
		default:
			return state
	}
}

export default reducer