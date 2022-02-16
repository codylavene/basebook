import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

const SignUpFormModal = ({ post, comment }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button
				onClick={(e) => {
					e.preventDefault();
					setShowModal(true);
				}}
				className="green-btn show-signup-btn"
			>
				Create New Account
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default SignUpFormModal;
