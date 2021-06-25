import { useEffect, useMemo, useState } from "react"

const useApi = (path, token = '', performOnMount = true, initialParams = {}) => {

	// Información del hook
	const [loading, setLoading] = useState(performOnMount)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	const [fetchParams, setFetchParams] = useState(initialParams)
	const [execute, setExecute] = useState(performOnMount)

	const config = useMemo(() => {
		const initialConfig = {
			method: 'GET',
			...fetchParams
		}

		if (token && token != '') {
			if (initialConfig.headers == null) {
				initialConfig.headers = {}
			}
			initialConfig.headers['api-token'] = token
		}

		return initialConfig
	}, [token, fetchParams])

	// Cuando cambie el valor de execute entonces lanzamos la petición
	useEffect(() => {
		if (execute) {
			// Actualizamos el valor de loading
			if (!loading) {
				setLoading(true)
			}
			console.log('Fetch to ', path, config.method)
			fetch(path, config)
				.then((res) => res.json())
				.then((json) => {
					if (json) {
						if (json.error) {
							setError(json.error)
						} else {
							setData(json)
							setError(null)
						}
					}
				})
				.catch((reason) => console.log(reason))
				.finally(() => setLoading(false))

		}
	}, [config, execute])

	const setParams = (newFetchParams) => {
		setFetchParams(newFetchParams)
	}

	const run = () => {
		setExecute(true)
	}

	return { loading, data, error, setParams, run }
}

export default useApi