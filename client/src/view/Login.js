import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setUser } from "../actions/user"

const Login = () => {
	const [data, setData] = useState()
	const dispatch = useDispatch()
	const history = useHistory()

	const onChange = (key) => {
		return (e) => setData({
			...data,
			[key]: e.target.value
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const body = JSON.stringify({
			username: data.username,
			password: data.password
		})
		fetch("/api/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		}).then((res) => {
			if (res.status === 200) {
				return res.json()
			} else {
				console.log(res)
			}
		}).then((json) => {
			dispatch(setUser(json.id, json.username, json.token))
			history.push("/notas")
		}).catch((reason) => {
			console.log("Error: ", reason)
		})

	}

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
			<button type="submit">Log</button>
		</form>

	</>
}

export default Login