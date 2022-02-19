import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePost from "./CreatePost";

const CreatePostModal = ({ user, message }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button
				onClick={(e) => {
					e.preventDefault();
					setShowModal(true);
				}}
				className="create-post--btn"
			>
				{message}
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreatePost setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default CreatePostModal;
