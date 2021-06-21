
const InputField = ({ type, innerRef, name, label, ...others }) => {
	var input = <input ref={innerRef} type={type} name={name} id={name} {...others} />
	if (type === 'textarea') {
		input = <textarea ref={innerRef} name={name} id={name} {...others} />
	}
	return <div>
		<label htmlFor={name}>{label}</label>
		{input}
	</div>
}

export default InputField