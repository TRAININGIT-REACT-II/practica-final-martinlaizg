
const InputField = ({ type, innerRef, name, label, ...others }) => {
	var input
	if (type === 'textarea') {
		input = <textarea ref={innerRef} name={name} id={name} {...others} />
	} else if (type === 'submit') {
		input = <button ref={innerRef} type={type} name={name} id={name} {...others} >{label}</button>
	} else {
		input = <input ref={innerRef} type={type} name={name} id={name} {...others} />
	}
	return <div>
		{type != 'submit' && <label htmlFor={name}>{label}</label>}
		{input}
	</div>
}

export default InputField