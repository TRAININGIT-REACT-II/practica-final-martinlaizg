import { useState } from "react"
import { useSelector } from "react-redux"
import { getNotes } from "../selectors/note"

const NoteList = () => {

	const notas = useSelector((state)=>getNotes(state))

	const listItems = notas && notas.map((n,i)=><li key={i}>{n.title}</li>)
	return <>
		<h2>NoteList</h2>
		<ul>
			{listItems}
		</ul>
	</>
}

export default NoteList