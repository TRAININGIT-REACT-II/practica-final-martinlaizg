import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

import { setUser } from "../actions/user"


const Signup = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({})
	const history = useHistory()

	const onSubmit = (e) => {
		e.preventDefault()
		const body = JSON.stringify({
			username: data.username,
			password: data.password
		})

		fetch("/api/register", {
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
			if (json) {
				dispatch(setUser(json.id, json.username, json.token))
				history.push("/notas")
			}
		}).catch((reason) => {
			console.log("Error: ", reason)
		})
	}

	const onChange = (key) => {
		return (e) => setData({
			...data,
			[key]: e.target.value
		})
	}

	return <>
		<h2>Signup</h2>
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor="username">Username </label>
				<input type="text" id="username" name="username" onChange={onChange("username")} />
			</div>
			<div>
				<label htmlFor="password">Password </label>
				<input type="password" id="password" name="password" onChange={onChange("password")} />
			</div>
			<button type="submit">Sign Up</button>
		</form>
	</>
}

export default Signup