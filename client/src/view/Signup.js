import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

import { setUser } from "../actions/user"
import useApiLogin from "../hooks/apiLogin"
import useApi from "../hooks/apiLogin"


const Signup = () => {
	const dispatch = useDispatch();
	const history = useHistory()
	const [data, setData] = useState({})

	//{ loading, user, error, setUserCredentials, run }
	const request = useApiLogin("/api/register")

	const onSubmit = (e) => {
		e.preventDefault()
		request.setUserCredentials(data)
		request.run()
	}

	useEffect(() => {
		if (request.user) {
			console.log("Changed user", request.user)
			dispatch(setUser(request.user.id, request.user.username, request.user.token))
			history.push("/notas")
		}
	}, [request.user])

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