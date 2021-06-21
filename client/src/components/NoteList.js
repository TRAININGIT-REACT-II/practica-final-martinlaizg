import Note from "./Note"


const NoteList = ({ notes }) => {

	return <>
		{notes.map((n, i) => <Note key={i} note={n} />)}
	</>
}

export default NoteList