import { useHistory } from "react-router-dom"

import { format } from '../util/DateUtil'

import "./Note.css"

const Note = ({ note }) => {

	const history = useHistory()

	const goToNote = () => {
		history.push(`/note/${note.id}`)
	}

	const date = note.content?.date && format(note.content.date)
	const style = "card"

	return <div className={"note " + style} onClick={goToNote}>
		<div className={style + '-header'}>
			<h3 className={style + '-title'}>{note.title}</h3>
			<small className={style + '-date'}>{date}</small>
		</div>
		<p>{note.content?.description}</p>
	</div>
}

export default Note