import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./DeleteComment";

const DeleteCommentModal = ({ post, comment, setShowButtons }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button
				onClick={() => {
					// setShowButtons(false);
					setShowModal(true);
				}}
			>
				Delete
			</button>
			{showModal && (
				<Modal
					onClose={() => {
						setShowButtons(false);
						setShowModal(false);
					}}
				>
					<DeleteComment
						setShowButtons={setShowButtons}
						setShowModal={setShowModal}
						comment={comment}
						post={post}
					/>
				</Modal>
			)}
		</>
	);
};

export default DeleteCommentModal;
