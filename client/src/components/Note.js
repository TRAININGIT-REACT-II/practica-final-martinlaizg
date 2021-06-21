
import "./Note.css"

const Note = ({ note }) => {

	const format = (time) => {
		let date = new Date(time)
		var h = date.getHours()
		var mm = date.getMinutes()
		var d = date.getDate()
		var m = date.getMonth() + 1
		var y = date.getFullYear()

		return (h <= 9 ? '0' + h : h) + ':' + (mm <= 9 ? '0' + mm : mm) + ' ' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y
	}

	const date = note.content?.date && format(note.content?.date)
	const style = "card"

	return <div className={style}>
		<div className={style + '-header'}>
			<h3 className={style + '-title'}>{note.title}</h3>
			<small className={style + '-date'}>{date}</small>
		</div>
		<p>{note.content?.description}</p>
	</div>
}

export default Note