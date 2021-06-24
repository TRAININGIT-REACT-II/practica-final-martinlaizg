
const InputField = ({ type, innerRef, name, label, defaultValue, ...others }) => {
	var input
	if (type === 'textarea') {
		input = <textarea ref={innerRef} name={name} id={name} defaultValue={defaultValue} {...others} ></textarea>
	} else if (type === 'submit') {
		input = <button ref={innerRef} type={type} name={name} id={name} {...others} >{label}</button>
	} else {
		input = <input ref={innerRef} type={type} name={name} id={name} defaultValue={defaultValue} {...others} />
	}
	return <div>
		{type != 'submit' && <label htmlFor={name}>{label}</label>}
		{input}
	</div>
}

export default InputField