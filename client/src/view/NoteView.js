import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import { format } from '../util/DateUtil'
import { removeNote, setNotes } from "../actions/note"
import { getNote } from "../selectors/note"
import { getUser } from "../selectors/user"

const NoteView = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const history = useHistory()

	const token = useSelector((state) => getUser(state))?.token
	const note = useSelector((state) => getNote(state, params.id))

	const fetchNote = () => {
		const fetchParams = {
			method: 'GET',
			headers: {
				'api-token': token
			}
		}
		fetch(`/api/notes/${params.id}`, fetchParams)
			.then((response) => response.json())
			.then((json) => { dispatch(setNotes([json])) })
	}

	const deleteNote = () => {
		const fetchParams = {
			method: 'DELETE',
			headers: {
				'api-token': token
			}
		}
		fetch(`/api/notes/${params.id}`, fetchParams)
			.then((response) => response.json())
			.then((json) => { 
				history.push('/notes')
				dispatch(removeNote(params.id)) 
			})
	}

	if (!note) {
		fetchNote()
		return <h3>No existe la nota</h3>
	}

	console.log("Note", note.content.description)
	return <>
		<h3>{note.title}</h3>
		<p>{note.content.description}</p>
		<small>Creada {format(note.content.date)}</small>
		<br />
		<button onClick={deleteNote}>Borrar</button>
	</>
}

export default NoteView