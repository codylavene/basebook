import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePost from "./CreatePost";

const CreatePostModal = ({ user }) => {
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
				What's on your mind, {user.first_name}?
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
