import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

import { setUser } from "../actions/user"
import useApi from '../hooks/useApi'

const Login = () => {
	const [data, setData] = useState()
	const dispatch = useDispatch()
	const history = useHistory()

	const request = useApi("/api/login", '', false, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const onChange = (key) => {
		return (e) => setData({
			...data,
			[key]: e.target.value
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const body = JSON.stringify({
			...data
		})
		request.setParams({ body })
		request.run()
	}

	useEffect(() => {
		if (request.data) {
			dispatch(setUser(request.data.id, request.data.username, request.data.token))
			history.push("/notes")
		}
	}, [request.data])

	return <>
		<h2>Login</h2>
		<form onSubmit={onSubmit}>
			<div className="form-input">
				<label htmlFor="username">Username </label>
				<input type="text" id="username" name="username" onChange={onChange("username")} />
			</div>
			<div className="form-input">
				<label htmlFor="password">Password </label>
				<input type="password" id="password" name="password" onChange={onChange("password")} />
			</div>
			<button type="submit">Login</button>
		</form>
	</>
}

export default Login