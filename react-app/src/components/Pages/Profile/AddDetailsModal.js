import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddDetailsForm from "./AddDetailsForm";

const AddDetailsModal = ({ user }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button onClick={() => setShowModal(true)}>Add details</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddDetailsForm setShowModal={setShowModal} user={user} />
				</Modal>
			)}
		</>
	);
};

export default AddDetailsModal;
