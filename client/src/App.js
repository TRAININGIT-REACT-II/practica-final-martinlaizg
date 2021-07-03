import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"

import store from "./store"

import PrivateRoute from "./components/PrivateRoute"
import ErrorBoundary from "./components/ErrorBoundary"
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
						<ErrorBoundary>
							<Home />
						</ErrorBoundary>
					</Route>
					<Route path="/login">
						<ErrorBoundary>
							<Login />
						</ErrorBoundary>
					</Route>
					<Route path="/signup">
						<ErrorBoundary>
							<Signup />
						</ErrorBoundary>
					</Route>
					<PrivateRoute path="/notes" exact>
						<ErrorBoundary>
							<Notes />
						</ErrorBoundary>
					</PrivateRoute>
					<PrivateRoute path="/notes/create" exact>
						<ErrorBoundary>
							<NotesForm />
						</ErrorBoundary>
					</PrivateRoute>
					<PrivateRoute path="/note/:id/edit" exact>
						<ErrorBoundary>
							<NoteEdit />
						</ErrorBoundary>
					</PrivateRoute>
					<PrivateRoute path="/note/:id" exact>
						<ErrorBoundary>
							<NoteView />
						</ErrorBoundary>
					</PrivateRoute>
				</main>
			</Router>
		</Provider>
	)
}

export default App
