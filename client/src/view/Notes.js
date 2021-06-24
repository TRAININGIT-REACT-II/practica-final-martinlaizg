import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUser } from "../selectors/user"

import NoteList from "../components/NoteList"
import { setNotes } from "../actions/note"

const Notes = () => {

	// Notas
	const [notes, setNotesState] = useState([])
	// usuario que realiza la peticion
	const token = useSelector((state) => getUser(state))?.token

	const dispatch = useDispatch()

	// Obtencion de notas
	const fetchNotes = () => {
		const fetchParams = {
			method: 'GET',
			headers: {
				'api-token': token
			}
		}
		fetch("/api/notes", fetchParams).then((response) => {
			return response.json()
		}).then((json) => {
			if (json.error) {

			} else {
				setNotesState(json)
				dispatch(setNotes(json))
			}
		})
	}

	// Use effect para cuando cambie el valor de token
	useEffect(() => {
		fetchNotes()
	}, [token])

	return <>
		<h2>NoteList</h2>
		<NoteList notes={notes}/>
	</>
}

export default Notes