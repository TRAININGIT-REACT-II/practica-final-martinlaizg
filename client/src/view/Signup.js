import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

import { setUser } from "../actions/user"
import useApi from "../hooks/useApi"


const Signup = () => {
	const dispatch = useDispatch();
	const history = useHistory()
	const [data, setData] = useState({})

	const request = useApi("/api/register", '', false, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	})

	const onSubmit = (e) => {
		e.preventDefault()
		const body = JSON.stringify({
			...data
		})
		request.setParams({ body: body })
		request.run()
	}

	useEffect(() => {
		if (request.data) {
			dispatch(setUser(request.data.id, request.data.username, request.data.token))
			history.push("/notes")
		}
	}, [request.data])

	const onChange = (key) => {
		return (e) => setData({
			...data,
			[key]: e.target.value
		})
	}

	return <>
		<h2>Signup</h2>
		<form onSubmit={onSubmit}>
			{request.error && <div className="error-message">{request.error}</div>}
			<div className="form-input">
				<label htmlFor="username">Username </label>
				<input type="text" id="username" name="username" onChange={onChange("username")} />
			</div>
			<div className="form-input">
				<label htmlFor="password">Password </label>
				<input type="password" id="password" name="password" onChange={onChange("password")} />
			</div>
			<button type="submit">Sign Up</button>
		</form>
	</>
}

export default Signup