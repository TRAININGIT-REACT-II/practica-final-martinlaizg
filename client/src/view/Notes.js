import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import { getUser } from "../selectors/user"

import NoteList from "../components/NoteList"

const Notes = () => {

	// Notas
	const [notes, setNotes] = useState([])
	// usuario que realiza la peticion
	const user = useSelector((state) => getUser(state))

	// token para la autenticacion, se actualizará cuando cambie el user
	const token = useMemo(() => {
		console.log("useMemo user", user ?? "")
		return user.token ?? ""
	}, [user])

	// Obtencion de notas
	const fetchNotes = () => {
		const fetchParams = {
			method: 'GET',
			headers: {
				'api-token': token
			}
		}
		console.log("fetch notes")
		fetch("/api/notes", fetchParams).then((response) => {
			return response.json()
		}).then((json) => {
			if (json.error) {

			} else {
				setNotes(json)
				console.log("NoteList fetch setNotes")
			}
		})
	}

	// Use effect para cuando cambie el valor de token
	useEffect(() => {
		console.log("useEffect token", token)
		fetchNotes()
	}, [token])

	return <>
		<h2>NoteList</h2>
		<NoteList notes={notes}/>
	</>
}

export default Notes