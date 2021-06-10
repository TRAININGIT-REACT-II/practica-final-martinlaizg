import { useEffect, useState } from "react"

// Recibimos como parametro la ruta
// Las credenciales se establecen después
// Este hook será "asíncrono", no se ejecutará por defecto
const useApiLogin = (path) => {

	// Información del hook
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)

	// Estados gestionados desde fuera del hook
	const [userCredentials, setUserCredentials] = useState({})
	const [execute, setExecute] = useState(false)

	const run = () => {
		setExecute(true)
	}

	// Cuando cambie el valor de execute entonces lanzamos la petición
	useEffect(() => {
		if (execute) {
			// Actualizamos el valor de loading
			if (!loading) {
				setLoading(true)
			}
			fetch(path, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: userCredentials.username,
					password: userCredentials.password
				})
			}).then((res) => {
				return res.json()
			}).then((json) => {
				if (json) {
					if (json.error) {
						setError(json.error)
					} else {
						setUser(json)
					}
				}
			}).catch((reason) => console.log(reason))
				.finally(() => setLoading(false))

		}
	}, [execute])

	return { loading, user, error, setUserCredentials, run }
}

export default useApiLogin