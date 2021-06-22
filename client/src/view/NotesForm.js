import { useRef } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

import { getUser } from "../selectors/user"

import Form from '../components/Form'
import InputField from '../components/InputField'

const NotesForm = () => {

	const titleRef = useRef(null)
	const descRec = useRef(null)

	const history = useHistory()

	const user = useSelector(state => getUser(state))

	const createNote = (formData) => {
		if (!user?.token) {
			return
		}

		let data = {
			title: formData.title,
			content: {
				description: formData.description,
				date: Date.now()
			}
		}
		let params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-token': user.token
			},
			body: JSON.stringify(data)
		}
		fetch('/api/notes', params)
			.then((response) => {
				return response.json()
			}).then((json) =>{
				if(!json?.error){
					history.push(`/note/${json.id}`)
				}
			})

	}

	return <>
		<h2>Crear una nota</h2>
		<Form onSend={createNote} refs={[titleRef, descRec]} >
			<InputField type="text" label="Nota" name='title' innerRef={titleRef} />
			<InputField type="textarea" label="Descripción" name='description' innerRef={descRec} />
			<InputField type="submit" />
		</Form>
	</>
}

export default NotesForm