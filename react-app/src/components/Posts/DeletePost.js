import React from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
const DeletePost = ({ setShowModal, post }) => {
	const dispatch = useDispatch();
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(postActions.deletePost(post.id));
		dispatch(postActions.getPosts());
		setShowModal(false);
	};

	const handleCancelClick = (e) => {
		e.preventDefault();
		setShowModal(false);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<div>Are you sure you want to delete this post?</div>
					<div>This action cannot be undone.</div>
				</div>
				<div>
					<button>Delete</button>
					<button onClick={handleCancelClick}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default DeletePost;
