import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"
import { getUser } from "../selectors/user"

// Componente que encapsula un Route
const PrivateRoute = ({ children, ...others }) => {
	const user = useSelector((state)=>getUser(state))
	// Sobreescribimos el metodo render de Route
	return <Route {...others}
		render={() => {
			if (user.token) {
				return children
			} else {
				return <Redirect to={{
					pathname: "/login",
					state: {
						reason: "Necesitas estar logeado para acceder"
					}
				}} />
			}
		}} />
}

export default PrivateRoute