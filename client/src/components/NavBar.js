import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { removeUser } from "../actions/user"
import { getUser } from "../selectors/user"

import './NavBar.css'

const Navbar = () => {

	const dispatch = useDispatch()
	const history = useHistory()

	const logout = () => {
		dispatch(removeUser())
		history.push("/login")
	}

	const user = useSelector((state) => getUser(state))
	const logged = user && user.token
	return <div className="navbar">
		<NavLink to="/" className="nav-item" activeClassName="active">Inicio</NavLink>
		{logged && <NavLink to="/notas" className="nav-item" activeClassName="active">Notas</NavLink>}
		<a className="spacer" href="#"></a>
		{!logged && <NavLink to="/login" className="nav-item" activeClassName="active">Login</NavLink>}
		{!logged && <NavLink to="/signup" className="nav-item" activeClassName="active">Sign Up</NavLink>}
		{logged && <a href="#" className="nav-item nav-user" >{user.username}</a>}
		{logged && <a onClick={logout} className="nav-item" href="#">Cerrar sesión</a>}
	</div>
}

export default Navbar