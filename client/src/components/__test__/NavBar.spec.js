import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { mount } from "enzyme"

import Navbar from "../NavBar"
import createMockStore from "redux-mock-store"
import { Provider } from "react-redux"
import { expect } from "@jest/globals"

describe(Navbar, () => {
	describe("Barra de navegación sin iniciar sesión", () => {
		let wrapper;

		beforeEach(() => {
			const mockStore = createMockStore([])
			const store = mockStore({ user: {} })
			wrapper = mount(
				<Provider store={store}>
					<Router>
						<Navbar />
					</Router>
				</Provider>)
		})

		it("No muestra los botones de navegación a listado de notas ni añadir notas", () => {
			expect(wrapper.find("div.navbar").length).toBe(1)
			expect(wrapper.find("a.nav-item").length).toBe(3)
			wrapper.find("a.nav-item").forEach((node) => {
				expect(node.text()).not.toBe("Notas")
				expect(node.text()).not.toBe("Añadir Nota")
			})
		})
	})

	describe("Barra de navegación con la sesión iniciada", () => {
		let wrapper;

		beforeEach(() => {
			const mockStore = createMockStore([])
			const store = mockStore({ user: { token: "mi-token"} })
			wrapper = mount(
				<Provider store={store}>
					<Router>
						<Navbar />
					</Router>
				</Provider>)
		})

		it("No muestra botónes de iniciar sesión ni de registrarse", () => {
			expect(wrapper.find("div.navbar").length).toBe(1)
			expect(wrapper.find("a.nav-item").length).toBe(4)
			wrapper.find("a.nav-item").forEach((node) => {
				expect(node.text()).not.toBe("Login")
				expect(node.text()).not.toBe("Sign Up")
			})
		})
	})
})