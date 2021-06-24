import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import './Modal.css'

const Modal = ({ children, show, onClose }) => {
	const modalRef = useRef(null)
	const modalGruoupRef = useRef(document.getElementById("modals"))

	useEffect(() => {
		const modalEl = document.createElement("div")
		modalEl.classList.add("hidden")
		modalGruoupRef.current.appendChild(modalEl)
		modalRef.current = modalEl
		return () => modalGruoupRef.current.removeChild(modalRef.current)
	}, [])

	useEffect(() => {
		if (modalRef.current != null) {
			if (show) {
				modalRef.current.classList.remove("hidden")
			} else {
				modalRef.current.classList.add("hidden")
			}
		}
	}, [show])

	if (show && modalRef.current != null) {
		return createPortal(<div className="modal-background" onClick={onClose}>
			<div className="modal">
				{children}
				<button type="button" onClick={onClose}>Cerrar</button>
			</div>
		</div>, modalRef.current)
	} else {
		return null
	}

}

export default Modal