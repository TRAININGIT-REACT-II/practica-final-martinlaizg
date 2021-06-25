import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import { format } from '../util/DateUtil'
import { addNote, removeNote, setNotes } from "../actions/note"
import { getNote } from "../selectors/note"
import { getUser } from "../selectors/user"
import ConfirmModal from "../components/ConfirmModal"
import useApi from "../hooks/useApi"

const NoteView = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const history = useHistory()

	const token = useSelector(getUser)?.token
	const note = useSelector((state) => getNote(state, params.id))
	const [showModal, setShowModal] = useState(false)

	const goToEditNote = () => history.push(`/note/${params.id}/edit`)

	//=====================
	// Obtención de la nota
	//=====================
	const getNoteReq = useApi(`/api/notes/${params.id}`, token, false, {})

	// Si no se ha encontrado la nota, se lanza la petición al servidor
	useEffect(() => {
		if (!note) {
			getNoteReq.run()
		}
	}, [note])

	// Cuando se actualize el resultado de la peticion se actualiza el state
	useEffect(() => {
		if (getNoteReq.data) {
			dispatch(addNote(getNoteReq.data))
		}
	}, [getNoteReq.data])

	//===================
	// Borrado de la nota
	//===================
	const removeNoteReq = useApi(`/api/notes/${params.id}`, token, false, { method: 'DELETE' })
	
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	const deleteNote = () => {
		removeNoteReq.run()
	}

	useEffect(() => {
		if (removeNoteReq.data) {
			dispatch(removeNote(params.id))
			history.push('/notes')
		}
	}, [removeNoteReq.data])

	if (!note) {
		return <h3>No existe la nota</h3>
	}

	return <>
		<h3>{note.title}</h3>
		<p>{note.content?.description}</p>
		<small>Creada {format(note.content?.date)}</small>
		<br />
		<button onClick={openModal}>Borrar</button>
		<button onClick={goToEditNote}>Editar</button>
		<ConfirmModal show={showModal} title="¿Estás seguro?" description="Vas a borrar una nota" onConfirm={deleteNote} onReject={closeModal} />
	</>
}

export default NoteView