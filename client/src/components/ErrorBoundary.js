import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	componentDidCatch(error, errorInfo) {
		console.error(error)
		console.error(errorInfo)
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	render() {
		if (this.state.hasError) {
			return <h1>Se ha causado un error</h1>
		}
		return this.props.children
	}
}
