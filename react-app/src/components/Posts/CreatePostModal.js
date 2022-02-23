import React, { useRef, useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePost from "./CreatePost";

const CreatePostModal = ({ user, message }) => {
	const [showModal, setShowModal] = useState(false);
	const createPostRef = useRef(null);

	// const focusCreatePost = (e) => {
	// 	createPostRef.current.focus();
	// };
	return (
		<>
			<button
				onClick={(e) => {
					e.preventDefault();
					setShowModal(true);
					// focusCreatePost(e);
				}}
				className="create-post--btn"
			>
				{message}
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreatePost
						setShowModal={setShowModal}
						createPostRef={createPostRef}
					/>
				</Modal>
			)}
		</>
	);
};

export default CreatePostModal;
