import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"

import store from "./store"

import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/NavBar"

import Home from "./view/Home"
import Login from "./view/Login"
import Signup from "./view/Signup"
import Notes from "./view/Notes"
import NotesForm from "./view/NotesForm"
import NoteView from "./view/NoteView"
import NoteEdit from "./view/NoteEdit"

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
					<PrivateRoute path="/notes" exact>
						<Notes />
					</PrivateRoute>
					<PrivateRoute path="/notes/create" exact>
						<NotesForm />
					</PrivateRoute>
					<PrivateRoute path="/note/:id/edit" exact>
						<NoteEdit />
					</PrivateRoute>
					<PrivateRoute path="/note/:id" exact>
						<NoteView />
					</PrivateRoute>
				</main>
			</Router>
		</Provider>
	)
}

export default App
