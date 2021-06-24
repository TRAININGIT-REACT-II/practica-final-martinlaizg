import { useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import { replaceNote, setNotes } from "../actions/note"
import { getNote } from "../selectors/note"
import { getUser } from "../selectors/user"
import Form from "../components/Form"
import InputField from "../components/InputField"

const NoteEdit = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const history = useHistory()

	const token = useSelector((state) => getUser(state))?.token
	const note = useSelector((state) => getNote(state, params.id))

	const titleRef = useRef(null)
	const descRec = useRef(null)

	const fetchNote = () => {
		const fetchParams = {
			method: 'GET',
			headers: {
				'api-token': token
			}
		}
		fetch(`/api/notes/${params.id}`, fetchParams)
			.then((response) => response.json())
			.then((json) => dispatch(setNotes([json])))
	}

	const cancelNote = () => {
		history.goBack()
	}

	const editNote = (formData) => {
		let data = {
			title: formData.title,
			content: {
				description: formData.description,
				date: note.content.date
			}
		}
		const fetchParams = {
			method: 'PUT',
			headers: {
				'api-token': token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		fetch(`/api/notes/${params.id}`, fetchParams)
			.then((response) => response.json())
			.then((json) => {
				dispatch(replaceNote(json))
				history.push(`/note/${params.id}`)
			})
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