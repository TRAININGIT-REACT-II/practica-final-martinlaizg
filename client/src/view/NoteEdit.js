import { useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import useApi from '../hooks/useApi'
import { addNote, replaceNote, setNotes } from "../actions/note"
import { getNote } from "../selectors/note"
import { getToken, getUser } from "../selectors/user"
import Form from "../components/Form"
import InputField from "../components/InputField"
import { useEffect } from "react"

const NoteEdit = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const history = useHistory()

	const token = useSelector(getToken)
	const note = useSelector((state) => getNote(state, params.id))

	const titleRef = useRef(null)
	const descRec = useRef(null)

	const requestGet = useApi(`/api/notes/${params.id}`, token, true, {})

	useEffect(() => {
		if (requestGet.data) {
			dispatch(addNote(requestGet.data))
		}
	}, [requestGet.data])

	const cancelNote = () => {
		history.goBack()
	}


	const requestUpdate = useApi(`/api/notes/${params.id}`, token, false, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	useEffect(() => {
		if (requestUpdate.data) {
			dispatch(replaceNote(requestUpdate.data))
			history.push(`/note/${params.id}`)
		}
	}, [requestUpdate.data])


	const editNote = (formData) => {
		let body = JSON.stringify({
			title: formData.title,
			content: {
				description: formData.description,
				date: note.content.date
			}
		})
		requestUpdate.setParams({ body })
		requestUpdate.run()
	}

	if (!note) {
		fetchNote()
		return <h3>No existe la nota</h3>
	}

	return <>
		<h2>Editar una nota</h2>
		<Form onSend={editNote} refs={[titleRef, descRec]} >
			<InputField type="text" label="Título" name='title' defaultValue={note.title} innerRef={titleRef} />
			<InputField type="textarea" label="Descripción" name='description' defaultValue={note.content?.description} innerRef={descRec} />
			<button type='button' onClick={cancelNote}>Cancelar</button>
			<button type='submit'>Aceptar</button>
		</Form>
	</>
}

export default NoteEdit