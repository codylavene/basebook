import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPost from "./EditPost";
const EditPostModal = ({ post }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			<button onClick={() => setShowModal(true)}>Edit</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditPost setShowModal={setShowModal} post={post} />
				</Modal>
			)}
		</div>
	);
};

export default EditPostModal;
