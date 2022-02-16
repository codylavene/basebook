import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./DeleteComment";

const DeleteCommentModal = ({ post, comment }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			<button onClick={() => setShowModal(true)}>Delete</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteComment
						setShowModal={setShowModal}
						comment={comment}
						post={post}
					/>
				</Modal>
			)}
		</div>
	);
};

export default DeleteCommentModal;
