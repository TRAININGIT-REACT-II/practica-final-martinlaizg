
import Modal from "./Modal"

const ConfirmModal = ({ title, description, show, onConfirm, onReject }) => {

	return <Modal show={show} onClose={onReject}>
		<h3>{title}</h3>
		<p>{description}</p>
		<button type="button" onClick={onConfirm}>Aceptar</button>
	</Modal>
}

export default ConfirmModal