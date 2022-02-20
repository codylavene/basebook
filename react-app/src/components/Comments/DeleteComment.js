import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
import * as commentActions from "../../store/comments";
const DeleteComment = ({ setShowModal, post, comment, setShowButtons }) => {
	const dispatch = useDispatch();
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(commentActions.deleteComment(post.id, comment.id));
		dispatch(postActions.getPosts());
		setShowButtons(false);
		setShowModal(false);
	};
	useEffect(() => {
		return () => {
			setShowButtons(false);
			setShowModal(false);
		};
	}, [setShowButtons, setShowModal]);
	const handleCancelClick = (e) => {
		e.preventDefault();
		setShowButtons(false);
		setShowModal(false);
	};
	return (
		<div className="delete-comment--card">
			<div className="modal-head" id="delete-modal--head">
				<div className="modal-text--container">Delete Comment?</div>
				<div
					className="close-delete-comment"
					onClick={() => setShowModal(false)}
				>
					<i className="fa-solid fa-xmark"></i>
				</div>
			</div>
			<form onSubmit={onSubmit} className="delete-comment--form">
				<div className="delete-comment--text">
					<div>Are you sure you want to delete this comment?</div>
				</div>
				<div className="delete-comment--btns">
					<button
						onClick={handleCancelClick}
						className="delete-comment--cancel"
					>
						No
					</button>
					<button className="delete-comment--delete">Delete</button>
				</div>
			</form>
		</div>
	);
};

export default DeleteComment;
