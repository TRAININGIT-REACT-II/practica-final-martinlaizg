import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"

import store from "./store"

import PrivateRoute from "./components/PrivateRoute"

import Home from "./view/Home"
import Login from "./view/Login"
import Signup from "./view/Signup"
import NoteList from "./view/NoteList"
import Navbar from "./components/NavBar"

// Componente principal de la aplicación.
const App = () => {

	// Mostramos la aplicación
	return (
		<Provider store={store}>
			<Router>
				<h1>TrainingNotes</h1>
				<Navbar />
				<main>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<PrivateRoute path="/notas">
						<NoteList />
					</PrivateRoute>
				</main>
			</Router>
		</Provider>
	)
}

export default App
