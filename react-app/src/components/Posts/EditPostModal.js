import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPost from "./EditPost";
const EditPostModal = ({ post, setShowButtons }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button onClick={() => setShowModal(true)}>Edit</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditPost
						setShowModal={setShowModal}
						post={post}
						setShowButtons={setShowButtons}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditPostModal;
