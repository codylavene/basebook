import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment";

const EditCommentModal = ({ post, comment }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button onClick={() => setShowModal(true)}>Edit</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditComment
						setShowModal={setShowModal}
						post={post}
						comment={comment}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditCommentModal;
