import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getToken } from "../selectors/user"
import { getNotes } from "../selectors/note"
import useApi from '../hooks/useApi'
import NoteList from "../components/NoteList"
import { setNotes } from "../actions/note"

const Notes = () => {
	// Notas
	const notes = useSelector(getNotes)
	// usuario que realiza la peticion
	const token = useSelector(getToken)
	const dispatch = useDispatch()

	const request = useApi('/api/notes', token, true, {})

	// Use effect para cuando cambie el valor de token
	useEffect(() => {
		dispatch(setNotes(request.data))
	}, [request.data])

	return <>
		<h2>NoteList</h2>
		{notes && notes.length > 0 && <NoteList notes={notes} />}
		{(!notes || notes.length == 0) && <h4>No tienes notas</h4>}
	</>
}

export default Notes