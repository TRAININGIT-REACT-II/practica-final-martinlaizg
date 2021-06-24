import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import { format } from '../util/DateUtil'
import { removeNote, setNotes } from "../actions/note"
import { getNote } from "../selectors/note"
import { getUser } from "../selectors/user"
import ConfirmModal from "../components/ConfirmModal"

const NoteView = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const history = useHistory()

	const token = useSelector((state) => getUser(state))?.token
	const note = useSelector((state) => getNote(state, params.id))

	const [showModal, setShowModal] = useState(false)

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

	const editNote = () => {
		history.push(`/note/${params.id}/edit`)
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

	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	if (!note) {
		fetchNote()
		return <h3>No existe la nota</h3>
	}

	return <>
		<h3>{note.title}</h3>
		<p>{note.content?.description}</p>
		<small>Creada {format(note.content?.date)}</small>
		<br />
		<button onClick={openModal}>Borrar</button>
		<button onClick={editNote}>Editar</button>
		<ConfirmModal show={showModal} title="¿Estás seguro?" description="Vas a borrar una nota" onConfirm={deleteNote} onReject={closeModal} />
	</>
}

export default NoteView