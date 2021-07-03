import { useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getToken } from "../selectors/user"
import useApi from "../hooks/useApi"
import { addNote } from '../actions/note'

import Form from '../components/Form'
import InputField from '../components/InputField'

const NotesForm = () => {

	const titleRef = useRef(null)
	const descRec = useRef(null)
	const dispatch = useDispatch()

	const history = useHistory()

	const token = useSelector(getToken)

	const req = useApi('/api/notes', token, false, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	useEffect(() => {
		if (req.data) {
			dispatch(addNote(req.data))
			history.push(`/note/${req.data.id}`)
		}
	}, [req.data])

	useEffect(() => {
		if (req.error) {
			console.error(req.error)
		}
	}, [req.error])

	const createNote = (formData) => {
		let params = {
			body: JSON.stringify({
				title: formData.title,
				content: {
					description: formData.description,
					date: Date.now()
				}
			})
		}
		req.setParams(params)
		req.run()

	}

	return <>
		<h2>Crear una nota</h2>
		<Form onSend={createNote} refs={[titleRef, descRec]} >
			<InputField type="text" label="Título" name='title' innerRef={titleRef} />
			<InputField type="textarea" label="Descripción" name='description' innerRef={descRec} />
			<InputField type="submit" label="Crear" />
		</Form>
	</>
}

export default NotesForm