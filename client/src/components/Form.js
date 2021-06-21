
const Form = ({ children, onSend, refs }) => {

	const submit = (e) => {
		e.preventDefault()
		var data = {}
		refs.forEach((r) => {
			data[r.current.name] = r.current.value
		})
		onSend(data)
	}

	return <form onSubmit={submit}>
		{children}
	</form>
}

export default Form