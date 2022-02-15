import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeletePost from "./DeletePost";
const DeletePostModal = ({ post }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			<button onClick={() => setShowModal(true)}>Delete</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeletePost setShowModal={setShowModal} post={post} />
				</Modal>
			)}
		</div>
	);
};

export default DeletePostModal;
